# Lernerweiterung - VS Code Lernplattform

**Lernerweiterung** ist eine interaktive Lernplattform, die direkt in Visual Studio Code integriert ist. Sie ermöglicht es Nutzern, verschiedene Programmiersprachen durch praxisnahe Lektionen und automatisierte Aufgabenprüfung zu erlernen.

## 🚀 Features

- **Integrierte Theorie:** Lektionen werden direkt in VS Code Webviews angezeigt.
- **Echte Coding-Umgebung:** Aufgaben werden in echten Editor-Tabs gelöst, nicht in einem Simulator.
- **Automatisierte Validierung:** Dein Code wird lokal mit installierten Compilern (gcc, python, node, etc.) ausgeführt und geprüft.
- **Progress-Tracking:** Behalte den Überblick über deinen Lernfortschritt direkt in der Sidebar.

## 📚 Unterstützte Sprachen

Derzeit bietet die Erweiterung Grundlagenkurse für folgende Sprachen:

- **C & C++** (Systemprogrammierung)
- **Java & C#** (Objektorientierung)
- **Python** (Skripting & Daten)
- **JavaScript** (Web & Node.js)
- **Rust** (Moderne Systemprogrammierung)

## 📂 Projektstruktur

- `src/`: Der Quellcode der VS Code Erweiterung (TypeScript).
- `lernen/`: Hier liegen alle Lerninhalte als Markdown-Dateien mit YAML-Metadaten.
- `dist/`: Kompilierter JavaScript-Code der Erweiterung.

## 🛠️ Entwicklung & Installation

Um die Erweiterung lokal zu entwickeln:

1. Klone das Repository.
2. Führe `npm install` aus, um die Abhängigkeiten zu installieren.
3. Drücke `F5` in VS Code, um den "Extension Development Host" zu starten.
4. Öffne die "Codekurs-Explorer" Sidebar in der neuen VS Code Instanz.

## 📝 Lizenz

Dieses Projekt steht unter der [MIT Lizenz](LICENSE).
