# ADR 0002: Use SQL Server LocalDB for v1

![Status](https://img.shields.io/badge/status-accepted-brightgreen)
![ADR](https://img.shields.io/badge/adr-0002-purple)
![Release](https://img.shields.io/badge/release-v1%20MVP-blue)
![Decision](https://img.shields.io/badge/decision-sql%20server%20localdb-green)

> This ADR records the decision to use SQL Server LocalDB as the database for FinancialTracker v1.

---

## 📌 Status

Accepted

---

## 🧭 Context

FinancialTracker v1 needs a local relational database for storing categories, income records, expense records, and budgets.

The database for v1 should be simple to run in a local development environment, work well with ASP.NET Core and Entity Framework Core, and remain manageable for a beginner full-stack project.

The project is intended for a single local user during early development, so the database choice does not need to support production-scale deployment, multi-user access, or cloud infrastructure in v1.

---

## ✅ Decision

FinancialTracker v1 will use SQL Server LocalDB as its database.

Entity Framework Core will be used to access and manage the database from the ASP.NET Core Web API backend.

---

## 🧱 Rationale

SQL Server LocalDB was chosen because it:

* Works well in Windows-based local development
* Integrates cleanly with ASP.NET Core and Entity Framework Core
* Supports relational modeling and SQL-based querying
* Is appropriate for a beginner-friendly local MVP
* Aligns with the technology style already used in related projects
* Provides a realistic database environment without unnecessary production complexity

This choice supports both the learning goals and the technical needs of the project.

---

## ✅ Expected Benefits

Using SQL Server LocalDB is expected to provide:

* Easy local development setup on Windows
* Good compatibility with Entity Framework Core migrations
* Reliable structured storage for financial records
* Familiar tooling for debugging and database inspection
* A clear path for learning relational database concepts

---

## ⚠️ Tradeoffs

This decision also includes tradeoffs:

* SQL Server LocalDB is Windows-focused
* It is not intended for real production hosting
* It is less portable than lighter alternatives such as SQLite
* A future production database migration may be needed if the project expands

These tradeoffs are acceptable for the scope of v1.

---

## ❌ Alternatives Considered

### 1. SQLite

SQLite would be lightweight and easy to set up, but SQL Server LocalDB was chosen because it aligns better with the Windows environment and the broader ASP.NET / SQL Server learning path.

### 2. Full SQL Server instance

A full SQL Server installation would provide more features, but it would add unnecessary setup and operational complexity for this MVP.

### 3. In-memory storage only

In-memory storage would be useful only for quick prototypes and would not support realistic persistence, migrations, or relational design practice.

---

## 📌 Consequences

As a result of this decision:

* The backend will use a SQL Server-compatible Entity Framework Core provider
* Local development will assume a Windows environment
* Database schema changes will likely be handled through EF Core migrations
* The v1 application will persist data locally rather than using external or cloud-hosted storage

---

## 🔄 Revisit Conditions

This decision should be revisited if:

* Cross-platform local development becomes a requirement
* The application needs cloud deployment
* Production hosting becomes part of scope
* The current database setup becomes a limitation for future goals

---

## 📝 Notes

This ADR defines the database choice for FinancialTracker v1.

Related design details are documented in:

* `docs/design/database-design.md`
* `docs/design/architecture.md`