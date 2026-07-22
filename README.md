# 💰 FinancialTracker

![Status](https://img.shields.io/badge/status-documentation%20started-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20ASP.NET%20Core%20%2B%20SQL%20Server-green)

> FinancialTracker is a React + ASP.NET application focused on helping users track income, manage expenses, create budgets, and view financial summaries.

---

## 📌 Project Overview

FinancialTracker is being developed as a personal finance tracking application and full-stack learning project. This project uses ASP.NET Core Web API for the backend and React for the frontend.

The v1 MVP focuses on tracking income, expenses, budgets, and financial summaries. The goal is to help a user understand their monthly financial picture.

---

## 🎯 v1 MVP Scope

The first version of FinancialTracker focuses on personal finance tracking and summary visibility.

### In Scope

* Track salary and other income
* Track monthly expenses
* Create and manage budgets
* View financial summaries
* Categorize income and expenses
* Use React as the frontend
* Use ASP.NET Core Web API as the backend
* Store data in SQL Server LocalDB
* Use Entity Framework Core for data access

### Out of Scope for v1

* User registration and login
* Multi-user accounts
* Bank account integrations
* Credit score tracking
* Investment portfolio tracking
* Native mobile app
* Cloud deployment
* Export to Excel or PDF
* Notifications and reminders
* AI financial advice
* Payments or monetization

---

## 🧱 Technology Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React |
| **Backend** | ASP.NET Core Web API |
| **Language** | C# / JavaScript |
| **Database** | SQL Server LocalDB |
| **ORM** | Entity Framework Core |
| **Testing** | xUnit / Frontend testing to be determined |
| **Version Control** | Git / GitHub |

---

## 🏗️ Architecture Summary

FinancialTracker v1 will use a layered full-stack architecture.

```text
React Frontend
     ↓
ASP.NET Core Web API
     ↓
Entity Framework Core
     ↓
SQL Server LocalDB