# ADR 0003: Keep React and API as Separate Projects

![Status](https://img.shields.io/badge/status-accepted-brightgreen)
![ADR](https://img.shields.io/badge/adr-0003-purple)
![Release](https://img.shields.io/badge/release-v1%20MVP-blue)
![Decision](https://img.shields.io/badge/decision-separate%20frontend%20and%20backend-green)

> This ADR records the decision to keep the React frontend and ASP.NET Core Web API backend as separate projects in FinancialTracker v1.

---

## 📌 Status

Accepted

---

## 🧭 Context

FinancialTracker v1 is a full-stack application with a React frontend and an ASP.NET Core Web API backend.

The project needs a structure that supports a clean separation between user interface concerns and backend application logic.

Because the project is also intended as a learning project, the structure should make it easier to understand how frontend and backend applications communicate without hiding that separation behind a more tightly coupled setup.

The system must support:

* A frontend application responsible for rendering the UI and collecting user input
* A backend API responsible for validation, business logic, persistence, and summary calculations
* Local development where both applications can run independently

---

## ✅ Decision

FinancialTracker v1 will keep the React frontend and ASP.NET Core Web API backend as separate projects.

The expected structure is:

```text
src
├── FinancialTracker.Api
└── FinancialTracker.Client