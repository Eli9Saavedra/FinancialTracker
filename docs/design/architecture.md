# 🏗️ Architecture

![Status](https://img.shields.io/badge/status-draft-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Document](https://img.shields.io/badge/document-architecture-green)

> This document defines the high-level architecture of FinancialTracker v1.

---

## 📌 Overview

FinancialTracker v1 is designed as a full-stack web application with a separated frontend, backend, and database.

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
     ↓
ASP.NET Core Web API
     ↓
Application Services
     ↓
Entity Framework Core
     ↓
SQL Server LocalDB