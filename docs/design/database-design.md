# 🗄️ Database Design

![Status](https://img.shields.io/badge/status-draft-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Document](https://img.shields.io/badge/document-database%20design-green)

> This document defines the database structure for FinancialTracker v1.

---

## 📌 Overview

FinancialTracker v1 uses SQL Server LocalDB as its local development database.

The purpose of the database is to store financial records related to income, expenses, budgets, and categories in a structured relational format that supports CRUD operations and summary calculations.

The database design for v1 is intentionally simple so the project remains manageable while still following real-world relational database practices.

---

## 🎯 Database Goals

The database design is intended to support the following goals:

* Store income records reliably
* Store expense records reliably
* Store category-based budgets
* Organize records by category
* Support monthly financial summaries through queries and calculations
* Maintain a structure that can grow in future versions

---

## 🧱 Database Technology

| Item | Value |
| --- | --- |
| **Database Engine** | SQL Server LocalDB |
| **Access Layer** | Entity Framework Core |
| **Database Style** | Relational database |
| **Primary Key Strategy** | Integer identity or GUID |
| **Environment** | Local development |

---

## 📂 Tables

FinancialTracker v1 includes the following primary tables:

* Categories
* Incomes
* Expenses
* Budgets

Monthly summaries are expected to be calculated from these tables rather than stored as a permanent table in v1.

---

## 🗂️ Categories Table

The Categories table stores the financial categories used to organize income, expenses, and budgets.

| Column | Type | Description |
| --- | --- | --- |
| **Id** | Integer / GUID | Primary key |
| **Name** | NVARCHAR | Category name |
| **Type** | NVARCHAR / Enum | Indicates income, expense, or both |
| **Description** | NVARCHAR | Optional description |
| **CreatedAt** | DATETIME | Record creation timestamp |
| **UpdatedAt** | DATETIME | Record update timestamp |

### Categories Constraints

* `Id` must be unique
* `Name` is required
* `Name` should be unique
* `Type` is required

---

## 💵 Incomes Table

The Incomes table stores income records entered by the user.

| Column | Type | Description |
| --- | --- | --- |
| **Id** | Integer / GUID | Primary key |
| **Source** | NVARCHAR | Income source name |
| **Amount** | DECIMAL | Income amount |
| **DateReceived** | DATE | Date the income was received |
| **CategoryId** | Integer / GUID | Foreign key to Categories |
| **Notes** | NVARCHAR | Optional notes |
| **CreatedAt** | DATETIME | Record creation timestamp |
| **UpdatedAt** | DATETIME | Record update timestamp |

### Incomes Constraints

* `Id` must be unique
* `Source` is required
* `Amount` is required
* `Amount` must be greater than zero
* `DateReceived` is required
* `CategoryId` is optional unless business rules later require it

---

## 💸 Expenses Table

The Expenses table stores expense records entered by the user.

| Column | Type | Description |
| --- | --- | --- |
| **Id** | Integer / GUID | Primary key |
| **Merchant** | NVARCHAR | Merchant or expense source |
| **Amount** | DECIMAL | Expense amount |
| **DateSpent** | DATE | Date the expense occurred |
| **CategoryId** | Integer / GUID | Foreign key to Categories |
| **Notes** | NVARCHAR | Optional notes |
| **CreatedAt** | DATETIME | Record creation timestamp |
| **UpdatedAt** | DATETIME | Record update timestamp |

### Expenses Constraints

* `Id` must be unique
* `Merchant` is required
* `Amount` is required
* `Amount` must be greater than zero
* `DateSpent` is required
* `CategoryId` is optional unless business rules later require it

---

## 🏦 Budgets Table

The Budgets table stores planned spending amounts by category and month.

| Column | Type | Description |
| --- | --- | --- |
| **Id** | Integer / GUID | Primary key |
| **CategoryId** | Integer / GUID | Foreign key to Categories |
| **Amount** | DECIMAL | Budget amount |
| **Month** | INT | Budget month |
| **Year** | INT | Budget year |
| **Notes** | NVARCHAR | Optional notes |
| **CreatedAt** | DATETIME | Record creation timestamp |
| **UpdatedAt** | DATETIME | Record update timestamp |

### Budgets Constraints

* `Id` must be unique
* `CategoryId` is required
* `Amount` is required
* `Amount` must be greater than zero
* `Month` is required
* `Year` is required
* One category should not have duplicate budget records for the same month and year

---

## 🔗 Relationships

FinancialTracker v1 uses the following relationships:

* One Category can have many Income records
* One Category can have many Expense records
* One Category can have many Budget records
* One Income optionally belongs to one Category
* One Expense optionally belongs to one Category
* One Budget belongs to one Category

---

## 🧭 Relational Summary

```text
Categories
   |--< Incomes
   |--< Expenses
   `--< Budgets
```

---

## 📊 Summary Calculation Design

Monthly financial summaries are derived from query results instead of a dedicated summary table in v1.

Summary calculations should include:

* Total income for a selected month
* Total expenses for a selected month
* Total budget for a selected month
* Remaining budget
* Net balance
* Spending grouped by category

This design avoids storing duplicate summary data and keeps v1 simpler.

---

## ✅ Indexing Considerations

The following indexes should be considered for v1:

* Primary key index on each table
* Unique index on `Categories.Name`
* Index on `Incomes.DateReceived`
* Index on `Expenses.DateSpent`
* Index on `Budgets.CategoryId`
* Composite index on `Budgets(CategoryId, Month, Year)`

These indexes support filtering, grouping, and budget lookup operations.

---

## 🛡️ Data Integrity Considerations

FinancialTracker v1 should enforce:

* Required values for important business fields
* Positive numeric values for financial amounts
* Referential integrity between child records and categories
* Protection against duplicate monthly budgets for the same category

Validation should exist in both the application layer and the database-aware persistence layer where appropriate.

---

## ❌ Excluded Database Features for v1

The database design for v1 does not include:

* User accounts table
* Roles or permissions tables
* Audit history tables
* Recurring transaction tables
* Bank integration tables
* Notification tables
* File attachment tables
* Cloud synchronization tables

---

## 📝 Notes

This database design document defines the relational data structure for FinancialTracker v1.

Implementation details such as entity classes, Entity Framework Core configurations, migrations, and connection strings will be handled during the implementation phase.
