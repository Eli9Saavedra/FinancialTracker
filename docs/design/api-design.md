# 🔌 API Design

![Status](https://img.shields.io/badge/status-draft-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Document](https://img.shields.io/badge/document-api%20design-green)

> This document defines the API structure and endpoint design for FinancialTracker v1.

---

## 📌 Overview

FinancialTracker v1 uses an ASP.NET Core Web API backend to manage application data and business logic.

The API will support CRUD operations for income, expenses, budgets, and categories, along with summary endpoints that return calculated financial overview data.

The backend API acts as the single source of truth for validation, persistence, and summary calculations.

---

## 🎯 API Goals

The API is designed to support the following goals:

* Provide clear CRUD endpoints for core financial entities
* Support local frontend-to-backend communication
* Centralize input validation and business rules
* Provide summary endpoints for monthly financial reporting
* Keep the API simple and maintainable for a v1 MVP

---

## 🧱 API Style

| Item | Value |
| --- | --- |
| **Architecture Style** | REST-style Web API |
| **Protocol** | HTTP / HTTPS |
| **Data Format** | JSON |
| **Backend Framework** | ASP.NET Core Web API |
| **Primary Consumer** | React frontend |
| **Authentication** | None in v1 |

---

## 📂 Endpoint Groups

FinancialTracker v1 includes the following endpoint groups:

* Categories
* Incomes
* Expenses
* Budgets
* Summaries

---

## 🗂️ Category Endpoints

Base route:

```text
/api/categories
```

| Method | Route | Purpose |
| --- | --- | --- |
| **GET** | `/api/categories` | Get all categories |
| **GET** | `/api/categories/{id}` | Get a single category by ID |
| **POST** | `/api/categories` | Create a category |
| **PUT** | `/api/categories/{id}` | Update a category |
| **DELETE** | `/api/categories/{id}` | Delete a category |

### Category Request Fields

* Name
* Type
* Description

### Category Response Fields

* Id
* Name
* Type
* Description
* CreatedAt
* UpdatedAt

---

## 💵 Income Endpoints

Base route:

```text
/api/incomes
```

| Method | Route | Purpose |
| --- | --- | --- |
| **GET** | `/api/incomes` | Get all income entries |
| **GET** | `/api/incomes/{id}` | Get a single income entry by ID |
| **POST** | `/api/incomes` | Create an income entry |
| **PUT** | `/api/incomes/{id}` | Update an income entry |
| **DELETE** | `/api/incomes/{id}` | Delete an income entry |

### Income Request Fields

* Source
* Amount
* DateReceived
* CategoryId
* Notes

### Income Response Fields

* Id
* Source
* Amount
* DateReceived
* CategoryId
* Notes
* CreatedAt
* UpdatedAt

---

## 💸 Expense Endpoints

Base route:

```text
/api/expenses
```

| Method | Route | Purpose |
| --- | --- | --- |
| **GET** | `/api/expenses` | Get all expense entries |
| **GET** | `/api/expenses/{id}` | Get a single expense entry by ID |
| **POST** | `/api/expenses` | Create an expense entry |
| **PUT** | `/api/expenses/{id}` | Update an expense entry |
| **DELETE** | `/api/expenses/{id}` | Delete an expense entry |

### Expense Request Fields

* Merchant
* Amount
* DateSpent
* CategoryId
* Notes

### Expense Response Fields

* Id
* Merchant
* Amount
* DateSpent
* CategoryId
* Notes
* CreatedAt
* UpdatedAt

---

## 🏦 Budget Endpoints

Base route:

```text
/api/budgets
```

| Method | Route | Purpose |
| --- | --- | --- |
| **GET** | `/api/budgets` | Get all budgets |
| **GET** | `/api/budgets/{id}` | Get a single budget by ID |
| **POST** | `/api/budgets` | Create a budget |
| **PUT** | `/api/budgets/{id}` | Update a budget |
| **DELETE** | `/api/budgets/{id}` | Delete a budget |

### Budget Request Fields

* CategoryId
* Amount
* Month
* Year
* Notes

### Budget Response Fields

* Id
* CategoryId
* Amount
* Month
* Year
* Notes
* CreatedAt
* UpdatedAt

---

## 📊 Summary Endpoints

Base route:

```text
/api/summaries
```

| Method | Route | Purpose |
| --- | --- | --- |
| **GET** | `/api/summaries/monthly?month={month}&year={year}` | Get a monthly financial summary |
| **GET** | `/api/summaries/category-spending?month={month}&year={year}` | Get expense totals grouped by category for a month |

### Monthly Summary Response Fields

* Month
* Year
* TotalIncome
* TotalExpenses
* TotalBudget
* RemainingBudget
* NetBalance

### Category Spending Response Fields

* CategoryId
* CategoryName
* TotalSpent

---

## 🧾 Example DTO Groups

The API is expected to use DTOs such as:

* CategoryDto
* CreateCategoryRequest
* UpdateCategoryRequest
* IncomeDto
* CreateIncomeRequest
* UpdateIncomeRequest
* ExpenseDto
* CreateExpenseRequest
* UpdateExpenseRequest
* BudgetDto
* CreateBudgetRequest
* UpdateBudgetRequest
* MonthlySummaryDto
* CategorySpendingSummaryDto

These names may be refined during implementation, but the concept should remain the same.

---

## 🛡️ Validation Expectations

The API should validate:

* Required fields
* Valid numeric amounts
* Valid month and year values where applicable
* Valid date values
* Category references where provided
* Duplicate category names where restricted
* Duplicate monthly budget records for the same category where restricted

The API should return clear and consistent validation errors to the frontend.

---

## 🚦 Response Behavior

The API should use conventional response behavior:

| Scenario | Expected Result |
| --- | --- |
| **Successful GET** | `200 OK` |
| **Successful POST** | `201 Created` |
| **Successful PUT** | `200 OK` or `204 No Content` |
| **Successful DELETE** | `204 No Content` |
| **Invalid input** | `400 Bad Request` |
| **Item not found** | `404 Not Found` |

---

## 🔄 Main API Workflow

The primary v1 API workflow is:

```text
Create category -> Create income -> Create expense -> Create budget -> Request monthly summary
```

The frontend will consume these endpoints to display and manage financial data.

---

## ❌ API Exclusions for v1

The FinancialTracker v1 API does not include:

* Authentication endpoints
* Authorization roles
* Bank integration endpoints
* File upload endpoints
* Notification endpoints
* Export endpoints
* Real-time websocket features
* AI advisory endpoints

---

## 📝 Notes

This document defines the planned endpoint structure for FinancialTracker v1.

Implementation details such as controller classes, service classes, validation logic, DTO definitions, and Entity Framework Core integration will be completed during the coding phase.
