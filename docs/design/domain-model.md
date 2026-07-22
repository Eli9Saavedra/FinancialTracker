# 🧩 Domain Model

![Status](https://img.shields.io/badge/status-draft-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Document](https://img.shields.io/badge/document-domain%20model-green)

> This document defines the core business entities and relationships for FinancialTracker v1.

---

## 📌 Overview

The FinancialTracker domain model describes the main business entities used by the application and the relationships between them.

FinancialTracker v1 focuses on tracking personal financial data through income entries, expense entries, budgets, categories, and monthly financial summaries.

The purpose of this model is to define the core concepts of the system before implementation begins.

---

## 🎯 Domain Goals

The domain model is designed to support the following goals:

* Represent personal income records
* Represent personal expense records
* Represent budget planning by category and period
* Represent financial organization through categories
* Support summary calculations for financial visibility

---

## 🧱 Core Entities

FinancialTracker v1 includes the following core entities:

* Income
* Expense
* Budget
* Category
* MonthlySummary

---

## 💵 Income

The Income entity represents money received by the user.

| Field | Type | Description |
| --- | --- | --- |
| **Id** | Integer / GUID | Unique identifier for the income entry |
| **Source** | String | The origin of the income, such as salary, freelance work, or bonus |
| **Amount** | Decimal | The monetary value of the income entry |
| **DateReceived** | Date | The date the income was received |
| **CategoryId** | Integer / GUID | Reference to the related category |
| **Notes** | String | Optional notes about the income entry |
| **CreatedAt** | DateTime | Date and time the record was created |
| **UpdatedAt** | DateTime | Date and time the record was last updated |

### Income Rules

* Each income entry must have a valid amount
* Each income entry must have a valid received date
* Each income entry may optionally belong to a category
* The amount should be greater than zero

---

## 💸 Expense

The Expense entity represents money spent by the user.

| Field | Type | Description |
| --- | --- | --- |
| **Id** | Integer / GUID | Unique identifier for the expense entry |
| **Merchant** | String | The merchant, vendor, or source of the expense |
| **Amount** | Decimal | The monetary value of the expense entry |
| **DateSpent** | Date | The date the expense occurred |
| **CategoryId** | Integer / GUID | Reference to the related category |
| **Notes** | String | Optional notes about the expense entry |
| **CreatedAt** | DateTime | Date and time the record was created |
| **UpdatedAt** | DateTime | Date and time the record was last updated |

### Expense Rules

* Each expense entry must have a valid amount
* Each expense entry must have a valid spent date
* Each expense entry may optionally belong to a category
* The amount should be greater than zero

---

## 🏦 Budget

The Budget entity represents a planned spending limit for a category and period.

| Field | Type | Description |
| --- | --- | --- |
| **Id** | Integer / GUID | Unique identifier for the budget record |
| **CategoryId** | Integer / GUID | Reference to the category the budget applies to |
| **Amount** | Decimal | The planned budget amount |
| **Month** | Integer | The month the budget applies to |
| **Year** | Integer | The year the budget applies to |
| **Notes** | String | Optional notes about the budget |
| **CreatedAt** | DateTime | Date and time the record was created |
| **UpdatedAt** | DateTime | Date and time the record was last updated |

### Budget Rules

* Each budget must be associated with a category
* Each budget must have a valid amount
* The amount should be greater than zero
* A budget applies to one month and one year
* A category should not have duplicate budgets for the same month and year

---

## 🗂️ Category

The Category entity represents a way to organize income and expense records.

| Field | Type | Description |
| --- | --- | --- |
| **Id** | Integer / GUID | Unique identifier for the category |
| **Name** | String | The display name of the category |
| **Type** | String / Enum | Indicates whether the category is used for income, expense, or both |
| **Description** | String | Optional description of the category |
| **CreatedAt** | DateTime | Date and time the record was created |
| **UpdatedAt** | DateTime | Date and time the record was last updated |

### Category Rules

* Each category must have a name
* Category names should be unique within the system
* A category may be used by many income entries
* A category may be used by many expense entries
* A category may be associated with many budgets

---

## 📊 MonthlySummary

The MonthlySummary entity represents a calculated financial overview for a given month and year.

| Field | Type | Description |
| --- | --- | --- |
| **Month** | Integer | The month being summarized |
| **Year** | Integer | The year being summarized |
| **TotalIncome** | Decimal | Total income for the selected month |
| **TotalExpenses** | Decimal | Total expenses for the selected month |
| **TotalBudget** | Decimal | Total configured budget for the selected month |
| **RemainingBudget** | Decimal | Budget remaining after expenses are applied |
| **NetBalance** | Decimal | Total income minus total expenses |

### Monthly Summary Rules

* MonthlySummary is a calculated view of data, not necessarily a permanently stored table
* MonthlySummary values are derived from income, expense, and budget records
* The summary should support clear reporting for a selected month and year

---

## 🔗 Entity Relationships

The main relationships in FinancialTracker v1 are:

* One Category can be associated with many Income entries
* One Category can be associated with many Expense entries
* One Category can be associated with many Budget entries
* One Budget belongs to one Category
* One Income may belong to one Category
* One Expense may belong to one Category
* One MonthlySummary is derived from many Income, Expense, and Budget records for a given month and year

---

## 🧭 Relationship Summary

```text
Category 1 ────< Income
Category 1 ────< Expense
Category 1 ────< Budget

MonthlySummary
   ├── derived from Income
   ├── derived from Expense
   └── derived from Budget