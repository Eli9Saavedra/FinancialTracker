# 💰 FinancialTracker

![Status](https://img.shields.io/badge/status-documentation%20complete-brightgreen)
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
* Export to Excel, CSV, or PDF
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
| **Testing** | xUnit |
| **Version Control** | Git / GitHub |

---

## 🏗️ Architecture Summary

FinancialTracker v1 uses a layered full-stack architecture.

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
```

The React frontend handles the user interface, user input, and API communication.

The ASP.NET Core Web API handles validation, business logic, CRUD operations, and financial summary calculations.

SQL Server LocalDB stores categories, income records, expense records, and budgets for local development.

---

## 🎨 Design Tokens

Design tokens are CSS variables defined in `src/styles/theme.css`. Always use tokens instead of hard-coded values in component styles.

---

### 🌈 Colour Tokens

| Token | Purpose |
| --- | --- |
| `--color-primary` | Main brand colour — buttons, highlights |
| `--color-secondary` | Secondary actions, links |
| `--color-accent` | Hover states, emphasis |
| `--color-success` | Positive values, income indicators |
| `--color-warning` | Near-budget warnings |
| `--color-danger` | Over-budget, errors, destructive actions |
| `--color-bg` | Page background (light/dark aware) |
| `--color-surface` | Card and panel backgrounds |
| `--color-text` | Default body text |
| `--color-text-muted` | Secondary/helper text |
| `--color-border` | Dividers and input borders |

---

### ✏️ Typography Tokens

| Token | Purpose |
| --- | --- |
| `--font-family` | Base font stack |
| `--font-size-sm` | Small/helper text |
| `--font-size-base` | Body text |
| `--font-size-lg` | Subheadings |
| `--font-size-xl` | Page headings |
| `--font-weight-normal` | Body weight |
| `--font-weight-bold` | Emphasis weight |
| `--line-height-base` | Body line height |

---

### 📐 Spacing Tokens

| Token | Value |
| --- | --- |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |

---

### 🔲 Border & Shadow Tokens

| Token | Purpose |
| --- | --- |
| `--radius-sm` | Small corner radius |
| `--radius-md` | Medium corner radius |
| `--radius-lg` | Large corner radius |
| `--shadow-sm` | Subtle element shadow |
| `--shadow-md` | Card/panel shadow |
| `--border-width` | Default border thickness |
| `--border-style` | Default border style |

---

## ⚙️ Environment Variables

Environment variables for the React client are defined in `.env` files inside the `FinancialTracker.Client` folder.

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Base URL of the backend API | `https://localhost:5228/api` |

| File | Used When |
| --- | --- |
| `.env.development` | Running locally with `npm run dev` |
| `.env.production` | Building for production with `npm run build` |

> `.env` files containing secrets should not be committed to source control.


## 📂 Project Structure

```text
FinancialTracker
├── .github
│   └── copilot-instructions.md
├── docs
│   ├── adr
│   │   ├── 0001-use-layered-architecture.md
│   │   ├── 0002-use-sql-server-localdb-for-v1.md
│   │   ├── 0003-keep-react-and-api-as-separate-projects.md
│   │   ├── 0004-use-category-based-financial-tracking.md
│   │   └── 0005-calculate-financial-summaries-in-the-backend.md
│   ├── design
│   │   ├── api-design.md
│   │   ├── architecture.md
│   │   ├── database-design.md
│   │   └── domain-model.md
│   ├── requirements
│   │   └── srs.md
│   ├── testing
│   │   └── test-plan.md
│   └── vision-and-scope.md
└── README.md
```

---

## 📚 Documentation

Project documentation is stored in the `docs/` folder.

| Document | Status | Link |
| --- | --- | --- |
| Vision and Scope | Complete | [View Document](docs/vision-and-scope.md) |
| Software Requirements Specification | Complete | [View Document](docs/requirements/srs.md) |
| Domain Model | Complete | [View Document](docs/design/domain-model.md) |
| Database Design / ERD | Complete | [View Document](docs/design/database-design.md) |
| API Design | Complete | [View Document](docs/design/api-design.md) |
| Architecture Document | Complete | [View Document](docs/design/architecture.md) |
| ADRs | Complete | [View Folder](docs/adr) |
| Test Plan | Complete | [View Document](docs/testing/test-plan.md) |

---

## 🧠 Architecture Decision Records

Architecture Decision Records document the major technical decisions made for FinancialTracker v1.

| ADR | Status | Link |
| --- | --- | --- |
| ADR 0001: Use Layered Architecture | Accepted | [View ADR](docs/adr/0001-use-layered-architecture.md) |
| ADR 0002: Use SQL Server LocalDB for v1 | Accepted | [View ADR](docs/adr/0002-use-sql-server-localdb-for-v1.md) |
| ADR 0003: Keep React and API as Separate Projects | Accepted | [View ADR](docs/adr/0003-keep-react-and-api-as-separate-projects.md) |
| ADR 0004: Use Category-Based Financial Tracking | Accepted | [View ADR](docs/adr/0004-use-category-based-financial-tracking.md) |
| ADR 0005: Calculate Financial Summaries in the Backend | Accepted | [View ADR](docs/adr/0005-calculate-financial-summaries-in-the-backend.md) |

---

## ✅ Current Project Status

The planning and documentation phase for v1 is complete.

Completed documentation artifacts:

* Vision and Scope
* Software Requirements Specification
* Domain Model
* Database Design
* API Design
* Architecture Document
* Architecture Decision Records
* Test Plan

Current phase:

```text
Documentation complete; ready for implementation phase
```

---

## 🚀 Next Steps

Planned implementation order:

1. Create the ASP.NET Core Web API project
2. Create the React frontend project
3. Configure the solution structure
4. Add Entity Framework Core and DbContext
5. Create Category, Income, Expense, and Budget entities
6. Create the initial database migration
7. Build CRUD endpoints for categories
8. Build CRUD endpoints for incomes
9. Build CRUD endpoints for expenses
10. Build CRUD endpoints for budgets
11. Build monthly summary endpoints
12. Connect the React frontend to the API
13. Add backend tests for validation and summary calculations

Main v1 workflow:

```text
Create category → Add income → Add expense → Create budget → View monthly summary
```

---

## 📝 License

License information has not been finalized yet.
