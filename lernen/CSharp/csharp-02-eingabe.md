---
title: "Benutzereingabe in C#"
description: "Lerne, wie du Daten vom Nutzer einliest."
order: 2
---

# Lektion 2: Daten einlesen

In C# nutzen wir die Methode `Console.ReadLine()`, um Text vom Nutzer zu lesen. Wenn wir Zahlen einlesen wollen, müssen wir den Text in den entsprechenden Datentyp umwandeln (konvertieren).

Beispiel:
```csharp
Console.Write("Gib deinen Namen ein: ");
string name = Console.ReadLine();
Console.WriteLine("Hallo " + name);
```

## Deine Aufgabe
Vervollständige das Programm so, dass das Alter eingelesen wird. Nutze `int.Parse()`, um den Text in eine Zahl umzuwandeln.

```csharp
using System;

class Programm {
    static void Main() {
        Console.Write("Gib dein Alter ein: ");
        
        // Lese hier das Alter ein:
        int alter = _________________________________;
        
        Console.WriteLine("Du bist " + alter + " Jahre alt.");
    }
}
```

---
solution: "int.Parse(Console.ReadLine());"
---
