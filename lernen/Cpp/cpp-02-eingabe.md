---
title: "Benutzereingabe in C++"
description: "Lerne, wie du Daten vom Nutzer einliest."
order: 2
---

# Lektion 2: Daten einlesen

In C++ nutzen wir das Objekt `std::cin` (zusammen mit dem Operator `>>`), um Eingaben von der Tastatur zu lesen.

Beispiel:
```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;
    std::cout << "Gib deinen Namen ein: ";
    std::cin >> name;
    std::cout << "Hallo " << name << std::endl;
    return 0;
}
```

## Deine Aufgabe
Vervollständige das Programm so, dass das Alter eingelesen wird.

```cpp
#include <iostream>

int main() {
    int alter;
    std::cout << "Gib dein Alter ein: ";
    
    // Lese hier das Alter ein:
    _________________________________;
    
    std::cout << "Du bist " << alter << " Jahre alt." << std::endl;
    return 0;
}
```

---
solution: "std::cin >> alter;"
---
