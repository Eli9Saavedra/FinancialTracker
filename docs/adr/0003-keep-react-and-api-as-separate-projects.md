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
|-- FinancialTracker.Api
`-- FinancialTracker.Client
```

The React application will communicate with the backend through HTTP API calls.

---

## 🧱 Rationale

This decision was chosen because it:

* Preserves a clear separation between frontend and backend responsibilities
* Makes API boundaries visible and intentional
* Supports realistic full-stack development practice
* Makes it easier to reason about where logic belongs
* Allows the backend to remain reusable for future clients
* Matches the project structure used in similar reference projects

This structure supports both learning and maintainability.

---

## ✅ Expected Benefits

Keeping the frontend and backend separate is expected to provide:

* Clearer project organization
* Better separation of concerns
* Easier troubleshooting when issues occur
* Cleaner backend ownership of validation and calculations
* More realistic experience with full-stack application design
* Flexibility to evolve frontend and backend independently

---

## ⚠️ Tradeoffs

This decision also introduces tradeoffs:

* Local development requires running two applications instead of one
* Additional setup is needed for frontend-to-backend communication
* CORS configuration may be required during development
* Initial setup may feel more complex for a beginner

These tradeoffs are acceptable because they reinforce proper architecture boundaries.

---

## ❌ Alternatives Considered

### 1. Serve the frontend directly from the backend project only

This approach could simplify startup, but it would hide the separation between frontend and backend and reduce the clarity of the full-stack architecture.

### 2. Build a backend-rendered UI instead of React

A server-rendered UI could reduce frontend tooling complexity, but it would not align with the project goal of learning React.

### 3. Combine all logic into one tightly coupled application structure

This could be faster for a small prototype, but it would reduce clarity, flexibility, and architectural discipline.

---

## 📌 Consequences

As a result of this decision:

* The frontend and backend will have separate project folders
* The frontend will call backend API routes over HTTP
* The backend will return JSON responses for frontend consumption
* CORS and local environment configuration will likely be needed
* Startup and deployment planning will consider both projects

---

## 🔄 Revisit Conditions

This decision should be revisited if:

* The project becomes simple enough that separate projects add unnecessary overhead
* A different frontend technology is chosen in the future
* A deployment model requires a different hosting structure
* The team or project goals change significantly

---

## 📝 Notes

This ADR defines the separation strategy for the React frontend and ASP.NET Core Web API backend.

Related design details are documented in:

* `docs/design/architecture.md`
* `docs/design/api-design.md`
