# 📋 Software Requirements Specification

![Status](https://img.shields.io/badge/status-draft-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Document](https://img.shields.io/badge/document-SRS-green)

> This document defines the functional and non-functional requirements for FinancialTracker v1.

---

## 📌 Introduction

This Software Requirements Specification (SRS) describes the requirements for FinancialTracker v1.

FinancialTracker is a personal finance tracking application designed to help a user record income, track expenses, manage budgets, and view financial summaries.

This document defines what the system must do, the quality attributes it should meet, and the constraints that apply to the first version of the project.

---

## 🎯 Purpose

The purpose of FinancialTracker v1 is to provide a simple and structured way for a user to manage personal financial information.

The application should allow the user to manually record financial activity and view useful summary information without relying on spreadsheets or external finance tools.

---

## 👥 Intended Users

FinancialTracker v1 is intended for a single local user.

The user is expected to:

* Manually enter income records
* Manually enter expense records
* Create and manage budgets
* View summaries of financial data by month or category

The application is not intended for businesses, multiple users, or shared household finance management in v1.

---

## 🧱 System Overview

FinancialTracker v1 is a full-stack application with:

* A React frontend for the user interface
* An ASP.NET Core Web API backend for application logic and data access
* SQL Server LocalDB for local data storage
* Entity Framework Core for database interaction

The system will allow the user to manage income, expenses, budgets, and categories through a structured interface.

---

## ✅ Functional Requirements

### Income Management

* The system shall allow the user to create an income entry
* The system shall allow the user to view income entries
* The system shall allow the user to edit an income entry
* The system shall allow the user to delete an income entry
* The system shall allow the user to assign a category to an income entry
* The system shall allow the user to record the amount, source, date, and notes for an income entry

### Expense Management

* The system shall allow the user to create an expense entry
* The system shall allow the user to view expense entries
* The system shall allow the user to edit an expense entry
* The system shall allow the user to delete an expense entry
* The system shall allow the user to assign a category to an expense entry
* The system shall allow the user to record the amount, merchant or source, date, and notes for an expense entry

### Budget Management

* The system shall allow the user to create a budget
* The system shall allow the user to view budgets
* The system shall allow the user to edit a budget
* The system shall allow the user to delete a budget
* The system shall allow the user to define a budget amount for a category and period
* The system shall allow the user to compare budgeted amounts to actual expenses

### Category Management

* The system shall allow the user to create a category
* The system shall allow the user to view categories
* The system shall allow the user to edit a category
* The system shall allow the user to delete a category
* The system shall support categories for both income and expense records

### Financial Summary Management

* The system shall allow the user to view total income for a selected month
* The system shall allow the user to view total expenses for a selected month
* The system shall allow the user to view remaining budget information
* The system shall allow the user to view spending by category
* The system shall allow the user to view a monthly summary of financial activity

---

## ⚙️ Data Requirements

FinancialTracker v1 shall store and manage the following core data types:

* Income entries
* Expense entries
* Budget records
* Category records
* Monthly summary-related calculated data

Each stored record shall include an identifier.

Income, expense, and budget records shall store enough information to support display, filtering, editing, deletion, and summary calculations.

---

## 🛡️ Validation Requirements

* The system shall require a valid amount for income entries
* The system shall require a valid amount for expense entries
* The system shall require a valid budget amount
* The system shall require a valid date for income and expense entries
* The system shall prevent empty required fields from being submitted
* The system shall reject invalid numeric formats
* The system shall reject negative values where they are not allowed by the design
* The system shall provide clear validation feedback to the user

---

## 🚦 Non-Functional Requirements

### Usability

* The application should provide a simple and beginner-friendly user interface
* The application should make financial information easy to read and understand
* The application should support a straightforward workflow for data entry and summary viewing

### Maintainability

* The application should use a clear project structure
* The codebase should be organized in a way that supports future expansion
* Documentation should remain aligned with implementation changes

### Performance

* The application should return standard CRUD operations quickly in a local development environment
* The application should generate monthly summaries without noticeable delay for expected v1 data sizes

### Reliability

* The application should store data consistently and retrieve it accurately
* The application should avoid data corruption during create, update, and delete operations

### Security

* The application does not require authentication in v1
* The application should still validate input and avoid unsafe data handling practices

---

## 🔒 Constraints

* FinancialTracker v1 will support one local user only
* FinancialTracker v1 will use SQL Server LocalDB as the database
* FinancialTracker v1 will use React for the frontend
* FinancialTracker v1 will use ASP.NET Core Web API for the backend
* FinancialTracker v1 will use Entity Framework Core for persistence
* The first release should remain limited to MVP functionality

---

## ❌ Out of Scope Requirements

The following are not required for FinancialTracker v1:

* Authentication and authorization
* Multi-user support
* Cloud hosting
* Third-party bank integrations
* Automatic transaction syncing
* Investment tracking
* Mobile app support
* Export features
* Notifications and reminders
* AI financial recommendations

---

## 🧭 Main v1 Workflow

The primary user workflow for FinancialTracker v1 is:

```text
Add income -> Add expenses -> Create budgets -> View financial summaries
```

Supporting workflows include:

```text
Create category -> Assign category to entry -> Review category spending
```

```text
Update financial record -> Recalculate summary -> Review updated monthly picture
```

---

## ✅ Acceptance Summary

FinancialTracker v1 will satisfy this SRS if the completed application can:

* Record and manage income entries
* Record and manage expense entries
* Record and manage budget entries
* Record and manage categories
* Display useful monthly financial summaries
* Persist data locally through the backend and database
* Support the primary v1 user workflow in a reliable and understandable way

---

## 📝 Notes

This SRS provides the requirements baseline for FinancialTracker v1.

Detailed object definitions, database schema design, API endpoint design, architecture decisions, and testing strategy are documented in related design and testing documents.
