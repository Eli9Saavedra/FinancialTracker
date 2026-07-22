# ADR 0005: Calculate Financial Summaries in the Backend

![Status](https://img.shields.io/badge/status-accepted-brightgreen)
![ADR](https://img.shields.io/badge/adr-0005-purple)
![Release](https://img.shields.io/badge/release-v1%20MVP-blue)
![Decision](https://img.shields.io/badge/decision-backend%20summary%20calculation-green)

> This ADR records the decision to calculate financial summaries in the backend for FinancialTracker v1.

---

## 📌 Status

Accepted

---

## 🧭 Context

FinancialTracker v1 needs to provide summary information such as total income, total expenses, total budget, remaining budget, and net balance.

These summary values depend on stored financial data and business rules that should remain consistent across the application.

If financial summaries are calculated in the frontend, business logic could become duplicated, harder to test, and easier to apply inconsistently.

Because the backend already owns validation, persistence, and API responses, it is the best place to centralize summary calculations.

The system must support:

* Monthly financial summaries
* Category-based spending summaries
* Consistent calculation behavior
* Reliable JSON responses for the frontend

---

## ✅ Decision

FinancialTracker v1 will calculate financial summaries in the backend.

The React frontend will request summary data from API endpoints and display the returned results.

The backend will calculate values such as:

* Total income
* Total expenses
* Total budget
* Remaining budget
* Net balance
* Spending by category

---

## 🧱 Rationale

This decision was chosen because it:

* Keeps business logic centralized
* Prevents duplication of calculation logic in the frontend
* Makes summary behavior easier to test
* Supports cleaner API design
* Improves consistency between stored data and displayed data
* Aligns with the layered architecture chosen for the project

This approach keeps the frontend simpler and the backend more authoritative.

---

## ✅ Expected Benefits

Calculating summaries in the backend is expected to provide:

* Consistent summary calculations
* Easier backend testing of financial logic
* Simpler frontend rendering logic
* Better separation of concerns
* Reduced risk of mismatched financial results

---

## ⚠️ Tradeoffs

This decision also introduces tradeoffs:

* The backend will take on more responsibility
* Additional summary endpoints are required
* Some simple display logic could have been done in the UI with less API design effort

These tradeoffs are acceptable because financial calculations are important business logic and should remain centralized.

---

## ❌ Alternatives Considered

### 1. Calculate summaries in the frontend

This would reduce backend work at first, but it would make the frontend responsible for core business rules and increase the risk of duplicated or inconsistent logic.

### 2. Store precomputed summaries permanently in the database

This could improve performance later, but it would introduce duplicate data and extra update complexity that is unnecessary for v1.

### 3. Split calculations between frontend and backend

This would create unclear ownership and make the design harder to understand and maintain.

---

## 📌 Consequences

As a result of this decision:

* The backend will expose summary-focused endpoints
* Summary DTOs will be part of the API design
* Calculation logic will likely live in service classes
* The frontend will primarily display summary results returned by the API
* The database will store source records rather than duplicate summary tables in v1

---

## 🔄 Revisit Conditions

This decision should be revisited if:

* Performance requirements change significantly
* Real-time dashboards or cached aggregates become necessary
* Multiple reporting use cases require specialized reporting storage
* The current approach becomes a bottleneck in future versions

---

## 📝 Notes

This ADR defines ownership of financial summary calculations for FinancialTracker v1.

Related design details are documented in:

* `docs/design/api-design.md`
* `docs/design/architecture.md`
* `docs/design/database-design.md`
