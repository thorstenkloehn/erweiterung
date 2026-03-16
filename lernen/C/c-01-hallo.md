---
title: "Hallo C"
description: "Dein erstes Programm in C."
order: 1
---

# Lektion 1: Hallo C
C ist eine der grundlegendsten Programmiersprachen. Jedes Programm beginnt mit einer `main`-Funktion und benötigt Header-Dateien wie `stdio.h` für Ein- und Ausgaben.

Beispiel:
```c
#include <stdio.h>

int main() {
    printf("Hallo Welt!\n");
    return 0;
}
```

## Deine Aufgabe
Schreibe ein Programm, das `"Hallo C"` auf der Konsole ausgibt. Vergiss nicht das `\n` am Ende für eine neue Zeile, falls nötig (für die Prüfung hier aber optional, solange der Text stimmt).

```c
// Schreibe hier deinen Code
```
---
solution: "#include <stdio.h>\n\nint main() {\n    printf(\"Hallo C\");\n    return 0;\n}"
output_expected: "Hallo C"
---