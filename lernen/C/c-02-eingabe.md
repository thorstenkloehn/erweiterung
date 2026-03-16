---
title: "Benutzereingabe in C"
description: "Lerne, wie du Daten vom Nutzer einliest."
order: 2
---

# Lektion 2: Daten einlesen
In C nutzen wir eine spezielle Funktion aus `stdio.h`, um Eingaben von der Tastatur zu lesen. Du musst dabei angeben, welcher Datentyp (z.B. `%d` für Integer) erwartet wird und wo das Ergebnis gespeichert werden soll (verwende das `&` Symbol vor der Variablen).

## Deine Aufgabe
Vervollständige das Programm so, dass das Alter eingelesen wird. 

**Hinweis:** Du musst die richtige Funktion finden und korrekt anwenden, um die Variable `alter` zu füllen.

```c
// Vervollständige den Code im Editor rechts
```
---
template: "#include <stdio.h>\n\nint main() {\n    int alter;\n    printf(\"Gib dein Alter ein: \");\n\n    // Lese hier das Alter ein:\n    _________________________________;\n\n    printf(\"Du bist %d Jahre alt.\\n\", alter);\n    return 0;\n}"
solution: "scanf(\"%d\", &alter);"
---