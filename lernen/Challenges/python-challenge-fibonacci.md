---
title: "Challenge: Fibonacci-Folge"
description: "Berechne die n-te Fibonacci-Zahl."
order: 1
type: "challenge"
---
# Die Fibonacci-Folge

Die Fibonacci-Folge ist eine unendliche Folge von Zahlen, bei der jede Zahl die Summe der beiden vorangegangenen ist (beginnend mit 0 und 1).

**Herausforderung:**
Schreibe eine Funktion `fib(n)`, die die n-te Fibonacci-Zahl zurückgibt.

---
solution: |
  def fib(n):
      if n <= 1:
          return n
      return fib(n-1) + fib(n-2)
required_keywords:
  - "def fib"
  - "return"
regex_solution: "def\\s+fib\\(n\\):.*return"
---
