# ADR 0004: Use Category-Based Financial Tracking

![Status](https://img.shields.io/badge/status-accepted-brightgreen)
![ADR](https://img.shields.io/badge/adr-0004-purple)
![Release](https://img.shields.io/badge/release-v1%20MVP-blue)
![Decision](https://img.shields.io/badge/decision-category%20based%20tracking-green)

> This ADR records the decision to organize financial records using categories in FinancialTracker v1.

---

## 📌 Status

Accepted

---

## 🧭 Context

FinancialTracker v1 is intended to help a user understand personal financial activity in a clear and organized way.

If income and expense records are stored without categories, the application can still record raw transactions, but it becomes harder to understand spending patterns, budget usage, and financial summaries.

Because budgets in v1 are planned by category, and monthly summaries need to show grouped financial behavior, the system needs a category-based structure.

The application must support:

* Organizing income records
* Organizing expense records
* Associating budgets with spending areas
* Reporting financial activity by category
* Producing clearer monthly summaries

---

## ✅ Decision

FinancialTracker v1 will use category-based financial tracking.

Categories will be used to organize:

* Income entries
* Expense entries
* Budget entries

A category will represent a financial grouping such as:

* Salary
* Freelance
* Groceries
* Rent
* Utilities
* Entertainment

---

## 🧱 Rationale

This decision was chosen because it:

* Improves financial organization
* Supports meaningful summaries and reporting
* Makes category-based budgets possible
* Helps the user identify spending patterns
* Reflects common finance tracking practices
* Keeps the v1 model simple while still useful

Categories provide structure without adding excessive complexity.

---

## ✅ Expected Benefits

Using category-based tracking is expected to provide:

* Better organization of financial records
* Clearer reporting and summaries
* Easier budget comparison against actual spending
* More useful financial insights for the user
* A flexible foundation for future reporting features

---

## ⚠️ Tradeoffs

This decision also introduces tradeoffs:

* The user may need to create and manage categories before entering data efficiently
* Some entries may not fit perfectly into a single category
* Additional validation may be needed to keep categories clean and consistent

These tradeoffs are acceptable because the benefits to organization and reporting are significant.

---

## ❌ Alternatives Considered

### 1. No categories in v1

This would simplify the data model slightly, but budgets and summaries would be less useful and less realistic.

### 2. Hard-code a fixed set of categories only

This would reduce flexibility and make the system less adaptable to different user needs.

### 3. Add advanced hierarchical categories in v1

A parent-child category model could be useful later, but it adds complexity beyond the needs of the MVP.

---

## 📌 Consequences

As a result of this decision:

* The system will include a Category entity and table
* Income and expense records may reference categories
* Budgets will be associated with categories
* Summary calculations will be able to group records by category
* Category management endpoints and UI flows will be needed

---

## 🔄 Revisit Conditions

This decision should be revisited if:

* The user needs multiple levels of categories
* Tags or more flexible classification are needed
* Reporting requirements become more advanced
* The category model becomes too limiting for future versions

---

## 📝 Notes

This ADR defines the decision to organize financial data through categories.

Related design details are documented in:

* `docs/design/domain-model.md`
* `docs/design/database-design.md`
* `docs/design/api-design.md`