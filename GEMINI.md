# Lernerweiterung

Lernerweiterung ist eine Visual Studio Code Lernplattform, die es ermöglicht, Programmiersprachen direkt in der IDE zu erlernen. Mit integrierten Lektionen und automatisierter Code-Validierung bietet sie ein interaktives Lernerlebnis.

## Projektübersicht
- **Zweck:** Interaktive Programmierkurse innerhalb von VS Code.
- **Inhalt:** Theorie und Aufgaben in Markdown-Dateien im Verzeichnis `lernen/`.
- **Validierung:** Lokale Ausführung von Code über System-Compiler/Interpreter.

## Verzeichnisstruktur `lernen/`
Die Kurse sind nach Programmiersprachen organisiert:
- `C/`: Grundlagen C
- `Cpp/`: Grundlagen C++ (neu hinzugefügt)
- `CSharp/`: Grundlagen C#
- `Java/`: Grundlagen Java (neu hinzugefügt)
- `Javascript/`: Grundlagen JavaScript
- `Python/`: Grundlagen Python (zuvor Programmiersprachen)
- `Rust/`: Grundlagen Rust
- `Übung/`: Allgemeine Übungsaufgaben

## Technische Details
- **Sprache:** TypeScript
- **Framework:** VS Code Extension API
- **Parsing:** Markdown mit YAML-Frontmatter für Metadaten (Titel, Reihenfolge, Lösung).

## Coding-Standards
- Strikte Typisierung in TypeScript.
- Asynchrone Datei- und Prozessoperationen.
- Nutzung nativer VS Code UI-Elemente für Benutzerfeedback.
