---
title: "Benutzereingabe in Java"
description: "Lerne, wie du Daten vom Nutzer einliest."
order: 2
---

# Lektion 2: Daten einlesen

In Java nutzen wir die Klasse `Scanner` aus dem Paket `java.util`, um Eingaben von der Tastatur zu lesen. Zuerst erstellen wir ein `Scanner`-Objekt, das mit `System.in` verbunden ist.

Beispiel:
```java
import java.util.Scanner;

public class Eingabe {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Gib deinen Namen ein: ");
        String name = scanner.nextLine();
        System.out.println("Hallo " + name);
    }
}
```

## Deine Aufgabe
Vervollständige das Programm so, dass das Alter eingelesen wird.

```java
import java.util.Scanner;

public class Loesung {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Gib dein Alter ein: ");
        
        // Lese hier das Alter ein:
        int alter = _________________________________;
        
        System.out.println("Du bist " + alter + " Jahre alt.");
    }
}
```

---
solution: "scanner.nextInt();"
---
