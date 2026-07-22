# 💰 Vision and Scope

![Status](https://img.shields.io/badge/status-draft-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Document](https://img.shields.io/badge/document-vision%20%26%20scope-green)

> This document defines the vision, goals, scope, and success criteria for FinancialTracker v1.

---

## 📌 Project Vision

FinancialTracker is being developed as a personal finance tracking application and full-stack learning project.

The purpose of the application is to help a user track income, record expenses, create budgets, and view financial summaries in a simple and organized way.

The project is also intended to provide hands-on experience with real-world software engineering practices, including planning, requirements analysis, system design, documentation, testing, and implementation using React and ASP.NET Core Web API.

---

## Problem Statement

Many people need a simple way to understand where their money is coming from, where it is going, and whether they are staying within budget.

Basic spreadsheets can help, but they often require manual organization, do not provide structured summaries by default, and can become harder to manage over time.

FinancialTracker aims to solve this problem by providing a structured application for managing personal financial data in a clearer and more maintainable way.

---

## 🎯 Project Goals

The primary goals of FinancialTracker v1 are:

* Allow a user to record salary and other income entries
* Allow a user to record monthly expenses
* Allow a user to create and manage budgets
* Allow a user to organize financial entries by category
* Provide financial summaries that help the user understand their monthly financial picture
* Serve as a practical full-stack learning project using React, ASP.NET Core Web API, Entity Framework Core, and SQL Server LocalDB

---

## 👥 Target Users

FinancialTracker v1 is designed for a single local user.

The primary target user is:

* A person who wants to manually track income, expenses, and budgets
* A beginner user who needs a simple summary of personal finances
* The developer of the project, using it as both a useful tool and a learning application

---

## ✅ In Scope for v1

FinancialTracker v1 includes the following features and capabilities:

* Track salary income
* Track additional income sources
* Track monthly expenses
* Create and manage budgets
* Assign categories to income and expense entries
* View total income for a selected period
* View total expenses for a selected period
* View remaining budget information
* View financial summaries by month
* Store financial data locally in SQL Server LocalDB
* Use ASP.NET Core Web API as the backend
* Use React as the frontend
* Use Entity Framework Core for data access

---

## ❌ Out of Scope for v1

The following features are intentionally excluded from version 1:

* User registration and login
* Multi-user accounts
* Cloud deployment
* Native mobile app
* Bank account integrations
* Automatic transaction imports
* Credit score tracking
* Investment portfolio tracking
* Bill reminders or notifications
* Export to Excel, CSV, or PDF
* AI-generated financial advice
* Payments, subscriptions, or monetization features

---

## 🧱 Business Scope for v1

FinancialTracker v1 focuses on basic personal finance visibility.

The application is intended to answer practical questions such as:

* How much income did I receive this month?
* How much did I spend this month?
* How much of my budget have I used?
* Which categories account for the most spending?
* What is my remaining budget for the month?

The first release is not intended to replace banking software, tax software, or advanced financial planning tools.

---

## 🧭 Success Criteria

FinancialTracker v1 will be considered successful if it can:

* Allow a user to add, edit, view, and delete income entries
* Allow a user to add, edit, view, and delete expense entries
* Allow a user to create and manage budgets
* Correctly categorize financial records
* Display clear monthly financial summaries
* Persist data locally and retrieve it reliably
* Support the main v1 workflow without requiring spreadsheets or external tools

Main v1 workflow:

```text
Add income → Add expenses → Create budgets → View financial summaries