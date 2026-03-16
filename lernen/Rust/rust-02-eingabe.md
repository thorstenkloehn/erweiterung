---
title: "Benutzereingabe in Rust"
description: "Lerne, wie du Daten vom Nutzer einliest."
order: 2
---

# Lektion 2: Daten einlesen

In Rust ist das Einlesen von Daten etwas komplexer. Wir nutzen `std::io::stdin()`, um einen Handle auf die Standardeingabe zu erhalten. Die Eingabe wird in einem Puffer (Buffer) gespeichert.

Beispiel:
```rust
use std::io;

fn main() {
    println!("Gib etwas ein:");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Fehler beim Lesen");
    println!("Du hast eingegeben: {}", input.trim());
}
```

## Deine Aufgabe
Vervollständige das Programm so, dass das Alter eingelesen und in eine Zahl umgewandelt wird.

```rust
use std::io;

fn main() {
    println!("Gib dein Alter ein:");
    let mut input = String::new();
    
    // Lese hier die Zeile ein:
    _________________________________;
    
    let alter: i32 = input.trim().parse().expect("Bitte eine Zahl eingeben");
    println!("Du bist {} Jahre alt.", alter);
}
```

---
solution: "io::stdin().read_line(&mut input).expect(\"Fehler\")"
---
