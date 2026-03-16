"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const contentParser_1 = require("./contentParser");
function activate(context) {
    console.log('Lernerweiterung ist aktiv.');
    const outputChannel = vscode.window.createOutputChannel('Lernerweiterung');
    outputChannel.appendLine('Aktiviere Lernerweiterung...');
    let coursesPath = path.join(context.extensionPath, 'lernen');
    if (!fs.existsSync(coursesPath)) {
        coursesPath = path.join(__dirname, '..', 'lernen');
    }
    const treeDataProvider = new CourseTreeDataProvider(coursesPath);
    const treeView = vscode.window.createTreeView('codekurs-explorer', { treeDataProvider });
    let currentPanel;
    let currentDocUri;
    const getExtensionForLanguage = (lang) => {
        const map = {
            'python': '.py',
            'javascript': '.js',
            'typescript': '.ts',
            'rust': '.rs',
            'c': '.c',
            'cpp': '.cpp',
            'csharp': '.cs',
            'java': '.java'
        };
        return map[lang] || '.txt';
    };
    const closeAllExerciseTabs = async () => {
        if (currentPanel) {
            currentPanel.dispose();
            currentPanel = undefined;
        }
        const allTabs = vscode.window.tabGroups.all.flatMap(group => group.tabs);
        for (const tab of allTabs) {
            if (tab.input instanceof vscode.TabInputText || tab.input instanceof vscode.TabInputWebview) {
                const uri = tab.input.uri;
                const viewType = tab.input.viewType;
                if (viewType === 'mainThreadWebview-lessonContent' || viewType === 'lessonContent') {
                    await vscode.window.tabGroups.close(tab);
                    continue;
                }
                if (uri) {
                    const isScratchFile = uri.fsPath && uri.fsPath.includes('.scratch_');
                    const isInLernenDir = uri.fsPath && uri.fsPath.includes('/lernen/');
                    if (isScratchFile || isInLernenDir) {
                        // Falls dirty, lautlos speichern um Dialog zu vermeiden
                        const doc = vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString());
                        if (doc && doc.isDirty) {
                            await doc.save();
                        }
                        await vscode.window.tabGroups.close(tab);
                    }
                }
            }
        }
        currentDocUri = undefined;
    };
    const refreshCoursesCommand = vscode.commands.registerCommand('codekurs.refreshCourses', () => {
        treeDataProvider.refresh();
        vscode.window.showInformationMessage('Kursliste aktualisiert!');
    });
    const createExerciseCommand = vscode.commands.registerCommand('codekurs.createExercise', async () => {
        const title = await vscode.window.showInputBox({
            prompt: 'Titel für die neue Übung eingeben',
            placeHolder: 'z.B. Mein Python-Skript'
        });
        if (!title)
            return;
        const fileName = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.md';
        const exerciseDir = path.join(coursesPath, 'Übung');
        if (!fs.existsSync(exerciseDir)) {
            fs.mkdirSync(exerciseDir, { recursive: true });
        }
        const filePath = path.join(exerciseDir, fileName);
        if (fs.existsSync(filePath)) {
            vscode.window.showErrorMessage('Eine Übung mit diesem Namen existiert bereits.');
            return;
        }
        const template = `---
title: "${title}"
description: "Eigene Übung: ${title}"
order: 100
type: "lesson"
---
# ${title}

Beschreibe hier deine Aufgabe.

---
solution: |
  # Deine Lösung hier
---
`;
        fs.writeFileSync(filePath, template, 'utf8');
        const doc = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(doc);
        treeDataProvider.refresh();
        vscode.window.showInformationMessage(`Übung "${title}" wurde erstellt.`);
    });
    const getLanguage = (lesson) => {
        const filePath = (lesson.filePath || "").toLowerCase();
        if (filePath.includes('rust'))
            return 'rust';
        if (filePath.includes('/c/'))
            return 'c';
        if (filePath.includes('csharp'))
            return 'csharp';
        if (filePath.includes('javascript') || filePath.includes('/js-'))
            return 'javascript';
        return 'python'; // Standard
    };
    const openLessonCommand = vscode.commands.registerCommand('codekurs.openLesson', async (lesson) => {
        if (!lesson || !lesson.metadata) {
            vscode.window.showErrorMessage('Fehler: Lektion konnte nicht geladen werden.');
            return;
        }
        await closeAllExerciseTabs();
        const lang = getLanguage(lesson);
        const commentChar = lang === 'rust' ? '//' : '#';
        const ext = getExtensionForLanguage(lang);
        // Temporäre Scratch-Datei im Extension-Verzeichnis erstellen
        const scratchDir = path.join(context.extensionPath, '.scratch');
        if (!fs.existsSync(scratchDir)) {
            fs.mkdirSync(scratchDir, { recursive: true });
        }
        const scratchPath = path.join(scratchDir, `.scratch_uebung${ext}`);
        let content = lesson.template || `${commentChar} Schreibe hier deinen Code für: ${lesson.metadata.title}\n\n`;
        // Datei physisch schreiben
        fs.writeFileSync(scratchPath, content, 'utf8');
        const doc = await vscode.workspace.openTextDocument(scratchPath);
        currentDocUri = doc.uri;
        // Editor in die Mitte (Spalte 1)
        await vscode.window.showTextDocument(doc, vscode.ViewColumn.One);
        // Webview nach rechts (Spalte 2)
        const panel = vscode.window.createWebviewPanel('lessonContent', lesson.metadata.title, vscode.ViewColumn.Two, {
            enableScripts: true,
            retainContextWhenHidden: true
        });
        currentPanel = panel;
        panel.webview.html = `
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${lesson.metadata.title}</title>
                <style>
                    :root {
                        --padding: 16px;
                    }
                    body {
                        font-family: var(--vscode-font-family);
                        color: var(--vscode-editor-foreground);
                        background-color: var(--vscode-editor-background);
                        padding: 0;
                        margin: 0;
                        line-height: 1.5;
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                        overflow: hidden;
                    }
                    
                    /* Header Bereich */
                    .header {
                        padding: var(--padding);
                        border-bottom: 1px solid var(--vscode-panel-border);
                        flex-shrink: 0;
                    }
                    .type-label {
                        font-size: 11px;
                        text-transform: uppercase;
                        color: var(--vscode-descriptionForeground);
                        margin-bottom: 4px;
                        letter-spacing: 0.5px;
                    }
                    .steps {
                        display: flex;
                        gap: 4px;
                        margin-top: 12px;
                    }
                    .step {
                        width: 24px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid var(--vscode-panel-border);
                        font-size: 12px;
                        border-radius: 2px;
                        color: var(--vscode-descriptionForeground);
                    }
                    .step.active {
                        background-color: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border-color: var(--vscode-button-background);
                    }
                    
                    /* Tabs */
                    .tabs {
                        display: flex;
                        padding: 0 var(--padding);
                        border-bottom: 1px solid var(--vscode-panel-border);
                        background-color: var(--vscode-editor-background);
                        flex-shrink: 0;
                    }
                    .tab {
                        padding: 8px 16px;
                        cursor: pointer;
                        font-size: 13px;
                        color: var(--vscode-descriptionForeground);
                        border-bottom: 2px solid transparent;
                    }
                    .tab.active {
                        color: var(--vscode-foreground);
                        border-bottom-color: var(--vscode-button-background);
                    }
                    
                    /* Content Bereich */
                    .content-wrapper {
                        flex-grow: 1;
                        overflow-y: auto;
                        padding: var(--padding);
                    }
                    h1 { 
                        font-size: 20px;
                        font-weight: 500;
                        margin-top: 0;
                        color: var(--vscode-foreground); 
                    }
                    p, li {
                        font-size: 14px;
                    }
                    pre {
                        background-color: var(--vscode-textBlockQuote-background);
                        padding: 12px;
                        border-radius: 4px;
                        overflow-x: auto;
                        font-family: var(--vscode-editor-font-family);
                    }
                    code {
                        font-family: var(--vscode-editor-font-family);
                        background-color: rgba(128, 128, 128, 0.1);
                        padding: 2px 4px;
                        border-radius: 3px;
                    }
                    pre code {
                        background-color: transparent;
                        padding: 0;
                    }
                    
                    /* Footer / Actions */
                    .footer {
                        padding: var(--padding);
                        border-top: 1px solid var(--vscode-panel-border);
                        display: flex;
                        gap: 12px;
                        background-color: var(--vscode-editor-background);
                        flex-shrink: 0;
                    }
                    button {
                        background-color: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 6px 16px;
                        cursor: pointer;
                        font-size: 13px;
                        border-radius: 2px;
                    }
                    button:hover {
                        background-color: var(--vscode-button-hoverBackground);
                    }
                    button.secondary {
                        background-color: transparent;
                        color: var(--vscode-button-background);
                        border: 1px solid var(--vscode-button-background);
                    }
                    
                    #solution-box {
                        display: none;
                        background-color: var(--vscode-textBlockQuote-background);
                        border-left: 4px solid var(--vscode-button-background);
                        padding: 12px;
                        margin-top: 16px;
                    }

                    .hint-toggle {
                        color: var(--vscode-textLink-foreground);
                        cursor: pointer;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        margin-top: 16px;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="type-label">${lesson.metadata.type === 'project' ? 'Project' : 'Task'}</div>
                    <div class="steps">
                        <div class="step active">1</div>
                        <div class="step">2</div>
                        <div class="step">3</div>
                        <div class="step">4</div>
                    </div>
                </div>

                <div class="tabs">
                    <div class="tab active">Description</div>
                    <div class="tab">Submissions</div>
                </div>

                <div class="content-wrapper">
                    <h1>${lesson.metadata.title}</h1>
                    ${lesson.content}
                    
                    <div class="hint-toggle" onclick="toggleSolution()">
                        <span>💡</span> Hint
                    </div>

                    <div id="solution-box">
                        <strong>Lösungsvorschlag:</strong>
                        <pre><code>${lesson.solution ? lesson.solution.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "Keine Lösung hinterlegt."}</code></pre>
                    </div>
                </div>

                <div class="footer">
                    <button onclick="check()">Check</button>
                    <!-- <button class="secondary" onclick="toggleSolution()">Solution</button> -->
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    function check() {
                        vscode.postMessage({ command: 'check' });
                    }
                    function toggleSolution() {
                        const box = document.getElementById('solution-box');
                        if (box.style.display === 'none' || box.style.display === '') {
                            box.style.display = 'block';
                        } else {
                            box.style.display = 'none';
                        }
                    }
                </script>
            </body>
            </html>
        `;
        panel.webview.onDidReceiveMessage(message => {
            if (message.command === 'check') {
                vscode.commands.executeCommand('codekurs.checkCode', lesson);
            }
        });
        panel.onDidDispose(() => {
            if (currentPanel === panel)
                currentPanel = undefined;
        });
    });
    const findNextLesson = (current) => {
        if (!current.filePath)
            return undefined;
        const dir = path.dirname(current.filePath);
        const allItems = (0, contentParser_1.getAllItemsInDir)(dir);
        const lessons = allItems.filter(item => typeof item !== 'string');
        const currentIndex = lessons.findIndex(l => l.filePath === current.filePath);
        if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
            return lessons[currentIndex + 1];
        }
        return undefined;
    };
    const checkCodeCommand = vscode.commands.registerCommand('codekurs.checkCode', async (lesson) => {
        if (!lesson) {
            vscode.window.showErrorMessage('Fehler: Keine Lektion zum Prüfen ausgewählt.');
            return;
        }
        const lang = getLanguage(lesson);
        let editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== lang) {
            editor = vscode.window.visibleTextEditors.find(e => e.document.languageId === lang);
        }
        if (!editor) {
            vscode.window.showErrorMessage(`Bitte öffne rechts das Fenster mit deinem ${lang}-Code!`);
            return;
        }
        const text = editor.document.getText();
        let isCorrect = false;
        // 1. Regex-Prüfung
        if (lesson.regexSolution) {
            const regex = new RegExp(lesson.regexSolution, 's');
            isCorrect = regex.test(text);
        }
        // 2. String-Prüfung (einfach)
        else {
            const cleanSolution = (lesson.solution || "").trim();
            isCorrect = !!cleanSolution && text.includes(cleanSolution);
        }
        // 3. Keywords-Prüfung (zusätzlich)
        if (lesson.requiredKeywords && lesson.requiredKeywords.length > 0) {
            const missing = lesson.requiredKeywords.filter(kw => !text.includes(kw));
            if (missing.length > 0) {
                vscode.window.showErrorMessage(`❌ Dir fehlen noch wichtige Bestandteile: ${missing.join(', ')}`);
                return;
            }
        }
        if (isCorrect) {
            vscode.window.showInformationMessage('✅ Richtig! Gut gemacht! Springe zur nächsten Aufgabe...');
            // 1. Nächste Lektion suchen
            const nextLesson = findNextLesson(lesson);
            // 2. Alle Übungsfenster schließen
            await closeAllExerciseTabs();
            // 3. Nächste Lektion öffnen (falls vorhanden)
            if (nextLesson) {
                vscode.commands.executeCommand('codekurs.openLesson', nextLesson);
            }
            else {
                vscode.window.showInformationMessage('Glückwunsch! Du hast alle Aufgaben in diesem Ordner abgeschlossen.');
            }
        }
        else {
            vscode.window.showErrorMessage('❌ Das ist noch nicht ganz richtig. Überprüfe deinen Code noch einmal.');
        }
    });
    context.subscriptions.push(createExerciseCommand, checkCodeCommand, refreshCoursesCommand, openLessonCommand, treeView);
}
class CourseTreeDataProvider {
    constructor(coursesPath) {
        this.coursesPath = coursesPath;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        if (typeof element === 'string') {
            const item = new vscode.TreeItem(element, vscode.TreeItemCollapsibleState.Collapsed);
            item.iconPath = new vscode.ThemeIcon('folder');
            return item;
        }
        else {
            const item = new vscode.TreeItem(element.metadata ? element.metadata.title : "Unbenannte Lektion");
            item.tooltip = element.metadata ? element.metadata.description : "";
            item.command = {
                command: 'codekurs.openLesson',
                title: 'Lektion öffnen',
                arguments: [element]
            };
            // Icons basierend auf Typ setzen
            let iconName = 'book';
            if (element.metadata.type === 'project')
                iconName = 'project';
            if (element.metadata.type === 'challenge')
                iconName = 'star';
            item.iconPath = new vscode.ThemeIcon(iconName);
            return item;
        }
    }
    getChildren(element) {
        let currentPath = this.coursesPath;
        if (typeof element === 'string') {
            currentPath = path.join(this.coursesPath, element);
        }
        else if (element) {
            return Promise.resolve([]);
        }
        try {
            const items = (0, contentParser_1.getAllItemsInDir)(currentPath);
            return Promise.resolve(items);
        }
        catch (error) {
            return Promise.resolve([]);
        }
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map