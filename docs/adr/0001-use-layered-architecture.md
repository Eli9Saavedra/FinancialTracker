# ADR 0001: Use Layered Architecture

![Status](https://img.shields.io/badge/status-accepted-brightgreen)
![ADR](https://img.shields.io/badge/adr-0001-purple)
![Release](https://img.shields.io/badge/release-v1%20MVP-blue)
![Decision](https://img.shields.io/badge/decision-layered%20architecture-green)

> This ADR records the decision to use a layered architecture for FinancialTracker v1.

---

## 📌 Status

Accepted

---

## 🧭 Context

FinancialTracker v1 is being developed as a full-stack personal finance tracking application.

The project needs a structure that keeps the user interface, backend logic, and data persistence concerns separated in a clear and maintainable way.

Because this project is also a learning project, the architecture should be simple enough to understand while still reflecting real-world software engineering practices.

The application must support:

* A React frontend
* An ASP.NET Core Web API backend
* Local data persistence through SQL Server LocalDB
* CRUD operations for income, expenses, budgets, and categories
* Financial summary calculations

Without clear separation of concerns, the application could become harder to maintain, test, and expand over time.

---

## ✅ Decision

FinancialTracker v1 will use a layered architecture.

The primary layers are:

* Frontend layer
* API layer
* Application or service layer
* Persistence layer
* Database layer

The high-level flow is:

```text
React Frontend
     ↓
ASP.NET Core Web API
     ↓
Application Services
     ↓
Entity Framework Core
     ↓
SQL Server LocalDB