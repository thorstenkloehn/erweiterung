import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { marked } from 'marked';

export interface CourseMetadata {
    title: string;
    description: string;
    order: number;
    type?: 'lesson' | 'project' | 'challenge'; // Neu: Typ der Lektion
}

export interface Lesson {
    metadata: CourseMetadata;
    content: string;
    solution?: string;
    template?: string; 
    outputExpected?: string;
    requiredKeywords?: string[]; // Neu: Pflichtbegriffe
    regexSolution?: string;    // Neu: Regex-basierte Prüfung
    filePath?: string;
}

export function parseCourse(filePath: string): Lesson | null {
    try {
        if (!fs.existsSync(filePath)) return null;
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const sections = fileContent.split('---');
        
        if (sections.length < 3) {
            return null;
        }

        const metadata = yaml.load(sections[1]) as CourseMetadata;
        const content = marked.parse(sections[2] || "") as string;
        
        if (!metadata) return null;

        let lesson: Lesson = { metadata, content, filePath };
        
        if (sections.length > 3 && sections[3].trim()) {
            const extraData = yaml.load(sections[3]) as any;
            if (extraData) {
                lesson.solution = extraData.solution;
                lesson.template = extraData.template;
                lesson.outputExpected = extraData.output_expected;
                lesson.requiredKeywords = extraData.required_keywords;
                lesson.regexSolution = extraData.regex_solution;
            }
        }

        return lesson;
    } catch (error) {
        return null;
    }
}

export function getAllItemsInDir(dirPath: string): (Lesson | string)[] {
    try {
        if (!fs.existsSync(dirPath)) return [];
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        
        const items: (Lesson | string)[] = [];
        
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                items.push(entry.name); // Gibt den Ordnernamen zurück
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                const lesson = parseCourse(fullPath);
                if (lesson) items.push(lesson);
            }
        }
        
        return items.sort((a, b) => {
            if (typeof a === 'string' && typeof b === 'string') {
                return a.localeCompare(b);
            }
            const orderA = typeof a === 'string' ? 0 : Number(a.metadata.order);
            const orderB = typeof b === 'string' ? 0 : Number(b.metadata.order);
            return orderA - orderB;
        });
    } catch (error) {
        return [];
    }
}