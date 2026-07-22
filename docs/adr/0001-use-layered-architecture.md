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
     |
ASP.NET Core Web API
     |
Application Services
     |
Entity Framework Core
     |
SQL Server LocalDB
```

Each layer will have a focused responsibility and should avoid taking on concerns that belong to another layer.

---

## 🧱 Rationale

A layered architecture was chosen because it:

* Separates presentation concerns from backend logic
* Keeps business logic out of the frontend
* Keeps persistence concerns out of controllers
* Supports maintainability as the project grows
* Makes the system easier to reason about as a beginner
* Aligns well with common ASP.NET Core application structure
* Provides a strong foundation for testing and future refactoring

This decision supports both the educational goals and the long-term maintainability goals of the project.

---

## ✅ Expected Benefits

Using a layered architecture is expected to provide:

* Clear separation of responsibilities
* Cleaner project organization
* Easier debugging and maintenance
* Better support for backend testing
* A backend that can support additional clients in the future
* Reduced risk of tightly coupled frontend and backend logic

---

## ⚠️ Tradeoffs

This approach also introduces some tradeoffs:

* More files and folders than a minimal prototype
* Slightly more setup and planning effort at the beginning
* More design discipline required during implementation

These tradeoffs are acceptable because they improve clarity and maintainability.

---

## ❌ Alternatives Considered

### 1. Put most logic directly in controllers

This approach would be faster to start, but it would make controllers harder to maintain and test as the project grows.

### 2. Put calculation logic in the frontend

This would reduce some backend work, but it would duplicate important business behavior in the UI and make the system less consistent.

### 3. Use a more complex architecture from the start

Architectures such as Clean Architecture or microservices were not selected for v1 because they would add complexity beyond the needs of this MVP.

---

## 📌 Consequences

As a result of this decision:

* The React frontend will focus on UI behavior and API calls
* The ASP.NET Core Web API will expose endpoints and coordinate requests
* Business rules and summary calculations should be kept in backend services
* Entity Framework Core will handle data persistence
* SQL Server LocalDB will remain the system of record for v1 data

This decision influences project structure, implementation organization, and testing strategy.

---

## 🔄 Revisit Conditions

This decision should be revisited if:

* The project grows significantly in complexity
* Multiple client applications need to be supported
* The current structure becomes difficult to maintain
* A more advanced architecture becomes justified by future requirements

---

## 📝 Notes

This ADR establishes the high-level structural direction for FinancialTracker v1.

Related design details are documented in:

* `docs/design/architecture.md`
* `docs/design/api-design.md`
* `docs/design/database-design.md`
