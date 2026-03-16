---
title: "Hallo Java"
description: "Dein erstes Programm in Java."
order: 1
---

# Lektion 1: Hallo Java

Java ist eine objektorientierte Programmiersprache. Jedes Programm muss in einer Klasse definiert sein. Die Ausführung beginnt immer mit der Methode `public static void main(String[] args)`.

Beispiel:
```java
public class HalloWelt {
    public static void main(String[] args) {
        System.out.println("Hallo Welt!");
    }
}
```

## Deine Aufgabe
Schreibe ein Java-Programm, das `"Hallo Java"` auf der Konsole ausgibt.

```java
public class Loesung {
    public static void main(String[] args) {
        // Schreibe hier deinen Code
    }
}
```

---
solution: "public class Loesung {\n    public static void main(String[] args) {\n        System.out.println(\"Hallo Java\");\n    }\n}"
output_expected: "Hallo Java"
---
