# 🏗️ Architecture

![Status](https://img.shields.io/badge/status-draft-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Document](https://img.shields.io/badge/document-architecture-green)

> This document defines the high-level architecture of FinancialTracker v1.

---

## 📌 Overview

FinancialTracker v1 is designed as a full-stack web application with separate frontend, backend, and database layers.

The architecture is intended to keep responsibilities clear, support maintainability, and provide a strong learning foundation for full-stack application development using React and ASP.NET Core Web API.

The system is designed for a single local user and prioritizes simplicity, clarity, and future extensibility.

---

## 🎯 Architecture Goals

The architecture is designed to support the following goals:

* Separate user interface concerns from business logic and data persistence
* Keep the backend as the main source of validation and calculation logic
* Support CRUD operations for financial data
* Support monthly summary calculations
* Keep the project simple enough for a v1 MVP
* Allow future growth without requiring a full redesign

---

## 🧱 Architectural Style

FinancialTracker v1 uses a layered architecture across the full stack.

| Layer | Responsibility |
| --- | --- |
| **Frontend** | User interface, user interaction, API calls, display logic |
| **API Layer** | HTTP endpoints, request handling, response handling |
| **Application / Service Layer** | Business rules, validation coordination, summary calculations |
| **Persistence Layer** | Database access through Entity Framework Core |
| **Database Layer** | Storage of income, expenses, budgets, and categories |

This structure helps keep the code organized and easier to reason about.

---

## 🖥️ High-Level System Diagram

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

---

## 🧩 Frontend Architecture

The frontend is a React application.

The frontend is responsible for:

* Displaying forms and views
* Collecting user input
* Calling backend API endpoints
* Showing lists of financial records
* Showing monthly summaries
* Displaying validation messages returned by the backend

The frontend should avoid owning business rules that belong in the backend.

---

## 🔌 Backend Architecture

The backend is an ASP.NET Core Web API application.

The backend is responsible for:

* Exposing REST-style endpoints
* Receiving and validating requests
* Coordinating business operations
* Managing CRUD behavior
* Performing financial summary calculations
* Reading from and writing to the database

The backend serves as the central application logic layer for v1.

---

## 🗄️ Database Architecture

The database layer uses SQL Server LocalDB for local development.

The database is responsible for:

* Persisting categories
* Persisting income records
* Persisting expense records
* Persisting budgets
* Supporting queries used for summaries and filtering

Entity Framework Core is used between the backend and database to map application entities to relational tables.

---

## 🔗 Component Responsibilities

| Component | Responsibility |
| --- | --- |
| **FinancialTracker.Client** | React frontend application |
| **FinancialTracker.Api** | ASP.NET Core Web API backend |
| **Entity Framework Core** | Object-relational mapping and persistence |
| **SQL Server LocalDB** | Local relational database storage |

If additional class library projects are introduced later, they should support separation of concerns without overcomplicating the MVP.

---

## 🚦 Request Flow

A typical request flow in FinancialTracker v1 is:

```text
User action in React UI
-> Frontend form submission
-> HTTP request to ASP.NET Core Web API
-> API endpoint receives request
-> Service logic validates and processes data
-> Entity Framework Core persists or queries data
-> API returns JSON response
-> React updates the UI
```

---

## 📊 Summary Calculation Flow

Monthly summaries are calculated from stored financial records.

```text
Income records + Expense records + Budget records
-> Summary calculation logic in backend
-> Monthly summary response DTO
-> React summary display
```

This design keeps summary logic centralized and consistent.

---

## 🛡️ Architecture Decisions for v1

FinancialTracker v1 intentionally uses:

* A separate React frontend and ASP.NET Core Web API backend
* A local relational database
* Backend-owned validation and summary calculations
* A simple layered structure rather than a highly complex architecture

This keeps the first version educational, maintainable, and realistic.

---

## ✅ Benefits of This Architecture

This architecture provides the following benefits:

* Clear separation of responsibilities
* Easier testing of backend logic
* Easier maintenance as the application grows
* Cleaner organization of frontend and backend code
* Reusable API endpoints for future clients
* A strong foundation for future enhancements

---

## ❌ Architecture Exclusions for v1

The architecture for v1 does not include:

* Microservices
* Event-driven messaging
* Cloud-hosted database infrastructure
* Authentication or identity services
* Background job processing
* Distributed caching
* Real-time push updates
* Native mobile clients

---

## 📝 Notes

This architecture document defines the high-level structure of FinancialTracker v1.

Detailed requirements, domain entities, database schema, and API contracts are documented in the related requirements and design documents.
