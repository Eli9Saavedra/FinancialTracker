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