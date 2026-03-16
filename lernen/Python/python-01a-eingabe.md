---
title: "Benutzereingabe in Python"
description: "Lerne, wie du Daten vom Nutzer einliest."
order: 1.5
---

# Lektion: Daten einlesen

In Python nutzen wir die Funktion `input()`, um Daten vom Nutzer zu erhalten. Diese Funktion gibt die Eingabe immer als **String** (Text) zurück. Wenn wir mit Zahlen rechnen wollen, müssen wir sie umwandeln (z.B. mit `int()`).

Beispiel:
```python
name = input("Gib deinen Namen ein: ")
print("Hallo " + name)
```

## Deine Aufgabe
Vervollständige das Programm so, dass das Alter eingelesen wird.

```python
# Lese hier das Alter ein (denk an die Umwandlung in eine Zahl):
alter = _________________________________

print(f"Du bist {alter} Jahre alt.")
```

---
solution: "int(input(\"Gib dein Alter ein: \"))"
---
