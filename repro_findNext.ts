
import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { marked } from 'marked';

interface CourseMetadata {
    title: string;
    description: string;
    order: number;
    type?: 'lesson' | 'project' | 'challenge';
}

interface Lesson {
    metadata: CourseMetadata;
    content: string;
    solution?: string;
    filePath?: string;
}

function parseCourse(filePath: string): Lesson | null {
    try {
        if (!fs.existsSync(filePath)) return null;
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const sections = fileContent.split('---');
        if (sections.length < 3) return null;
        const metadata = yaml.load(sections[1]) as CourseMetadata;
        const content = marked.parse(sections[2] || "") as string;
        if (!metadata) return null;
        return { metadata, content, filePath };
    } catch (error) {
        return null;
    }
}

function getAllItemsInDir(dirPath: string): (Lesson | string)[] {
    try {
        if (!fs.existsSync(dirPath)) return [];
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        const items: (Lesson | string)[] = [];
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                items.push(entry.name);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                const lesson = parseCourse(fullPath);
                if (lesson) items.push(lesson);
            }
        }
        return items.sort((a, b) => {
            const orderA = typeof a === 'string' ? 0 : Number(a.metadata.order);
            const orderB = typeof b === 'string' ? 0 : Number(b.metadata.order);
            return orderA - orderB;
        });
    } catch (error) {
        return [];
    }
}

const findNextLesson = (current: Lesson): Lesson | undefined => {
    if (!current.filePath) return undefined;
    const dir = path.dirname(current.filePath);
    const allItems = getAllItemsInDir(dir);
    const lessons = allItems.filter(item => typeof item !== 'string') as Lesson[];
    const currentIndex = lessons.findIndex(l => l.filePath === current.filePath);
    if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
        return lessons[currentIndex + 1];
    }
    return undefined;
};

// Test with real files
const pythonDir = path.join(process.cwd(), 'lernen/Python');
const introPath = path.join(pythonDir, 'python-intro.md');
const introLesson = parseCourse(introPath);

if (introLesson) {
    console.log('Intro Lesson found:', introLesson.metadata.title);
    const next = findNextLesson(introLesson);
    if (next) {
        console.log('Next lesson found:', next.metadata.title, next.filePath);
    } else {
        console.log('Next lesson NOT found!');
    }
} else {
    console.log('Intro Lesson NOT found at', introPath);
}
