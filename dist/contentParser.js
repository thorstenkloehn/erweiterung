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
exports.parseCourse = parseCourse;
exports.getAllItemsInDir = getAllItemsInDir;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const yaml = __importStar(require("js-yaml"));
const marked_1 = require("marked");
function parseCourse(filePath) {
    try {
        if (!fs.existsSync(filePath))
            return null;
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const sections = fileContent.split('---');
        if (sections.length < 3) {
            return null;
        }
        const metadata = yaml.load(sections[1]);
        const content = marked_1.marked.parse(sections[2] || "");
        if (!metadata)
            return null;
        let lesson = { metadata, content, filePath };
        if (sections.length > 3 && sections[3].trim()) {
            const extraData = yaml.load(sections[3]);
            if (extraData) {
                lesson.solution = extraData.solution;
                lesson.template = extraData.template;
                lesson.outputExpected = extraData.output_expected;
                lesson.requiredKeywords = extraData.required_keywords;
                lesson.regexSolution = extraData.regex_solution;
            }
        }
        return lesson;
    }
    catch (error) {
        return null;
    }
}
function getAllItemsInDir(dirPath) {
    try {
        if (!fs.existsSync(dirPath))
            return [];
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        const items = [];
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                items.push(entry.name); // Gibt den Ordnernamen zurück
            }
            else if (entry.isFile() && entry.name.endsWith('.md')) {
                const lesson = parseCourse(fullPath);
                if (lesson)
                    items.push(lesson);
            }
        }
        return items.sort((a, b) => {
            const titleA = typeof a === 'string' ? a : a.metadata.order.toString();
            const titleB = typeof b === 'string' ? b : b.metadata.order.toString();
            return titleA.localeCompare(titleB);
        });
    }
    catch (error) {
        return [];
    }
}
//# sourceMappingURL=contentParser.js.map