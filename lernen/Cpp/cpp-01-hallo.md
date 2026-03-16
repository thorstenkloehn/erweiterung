---
title: "Hallo C++"
description: "Dein erstes Programm in C++."
order: 1
---

# Lektion 1: Hallo C++

C++ ist eine leistungsstarke, systemnahe Programmiersprache, die auf C aufbaut. Ein C++-Programm nutzt oft die `iostream`-Bibliothek für Ein- und Ausgaben. Die Ausführung startet in der `main`-Funktion.

Beispiel:
```cpp
#include <iostream>

int main() {
    std::cout << "Hallo Welt!" << std::endl;
    return 0;
}
```

## Deine Aufgabe
Schreibe ein C++-Programm, das `"Hallo C++"` auf der Konsole ausgibt.

```cpp
#include <iostream>

int main() {
    // Schreibe hier deinen Code
    return 0;
}
```

---
solution: "#include <iostream>\n\nint main() {\n    std::cout << \"Hallo C++\" << std::endl;\n    return 0;\n}"
output_expected: "Hallo C++"
---
