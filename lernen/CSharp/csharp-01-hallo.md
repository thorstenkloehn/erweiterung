---
title: "Hallo C#"
description: "Dein erstes Programm in C#."
order: 1
---

# Lektion 1: Hallo C#
C# (gesprochen "C Sharp") ist eine moderne, objektorientierte Sprache von Microsoft. Jedes Programm beginnt normalerweise in einer `Main`-Methode.

Beispiel:
```csharp
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hallo Welt!");
    }
}
```

## Deine Aufgabe
Schreibe ein Programm, das `"Hallo C#"` auf der Konsole ausgibt.

```csharp
// Schreibe hier deinen Code
```
---
solution: "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hallo C#\");\n    }\n}"
output_expected: "Hallo C#"
---