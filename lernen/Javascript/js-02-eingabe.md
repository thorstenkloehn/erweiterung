---
title: "Benutzereingabe in JavaScript"
description: "Lerne, wie du Daten vom Nutzer einliest."
order: 2
---

# Lektion 2: Daten einlesen

In einer Node.js Umgebung (wie sie VS Code nutzt) ist das Einlesen von der Konsole asynchron. Wir nutzen oft das Modul `readline`.

Beispiel:
```javascript
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Wie heißt du? ', name => {
  console.log(`Hallo ${name}!`);
  readline.close();
});
```

## Deine Aufgabe
Vervollständige das Programm so, dass das Alter eingelesen wird.

```javascript
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Gib dein Alter ein: ', alter => {
  // Gib das Alter aus:
  _________________________________
  readline.close();
});
```

---
solution: "console.log(`Du bist ${alter} Jahre alt.`);"
---
