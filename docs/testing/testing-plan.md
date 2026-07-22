# 🧪 Test Plan

![Status](https://img.shields.io/badge/status-draft-blue)
![Version](https://img.shields.io/badge/version-0.1-blue)
![Release](https://img.shields.io/badge/release-v1%20MVP-purple)
![Document](https://img.shields.io/badge/document-test%20plan-green)

> This document defines the testing strategy for FinancialTracker v1.

---

## 📌 Overview

FinancialTracker v1 needs testing to confirm that core financial tracking features work correctly and reliably.

The purpose of this test plan is to define what should be tested, how it should be tested, and which parts of the system are most important to validate during development.

The first version of the project focuses on local development and a manageable MVP scope, so the testing strategy emphasizes practical coverage of core business behavior rather than enterprise-scale test complexity.

---

## 🎯 Testing Goals

The testing strategy for FinancialTracker v1 is designed to support the following goals:

* Verify that income, expense, budget, and category features work correctly
* Verify that financial summaries are calculated accurately
* Verify that validation rules are enforced
* Reduce the risk of data handling errors
* Support confidence during future code changes

---

## 🧱 Testing Scope

The following areas are in scope for testing in v1:

* Category creation, update, retrieval, and deletion
* Income creation, update, retrieval, and deletion
* Expense creation, update, retrieval, and deletion
* Budget creation, update, retrieval, and deletion
* Monthly financial summary calculations
* Category-based spending summary calculations
* Validation behavior for invalid input
* API response behavior for common success and failure cases

---

## ❌ Out of Scope for v1 Testing

The following testing areas are out of scope or limited for v1:

* Performance benchmarking at production scale
* Load testing
* Security penetration testing
* Multi-user concurrency testing
* Cross-browser enterprise compatibility testing
* Mobile device testing
* Cloud deployment testing

---

## 🧪 Test Levels

FinancialTracker v1 should use the following test levels.

### Unit Tests

Unit tests should focus on:

* Validation logic
* Service-layer business rules
* Summary calculations
* Small isolated components of backend behavior

### Integration Tests

Integration tests should focus on:

* API endpoints
* Entity Framework Core data access behavior
* Database interactions
* End-to-end backend request flow

### Manual Testing

Manual testing should focus on:

* React form behavior
* Frontend-to-backend interaction
* Financial entry workflows
* Summary display behavior
* General usability of the local MVP

---

## 📂 Planned Test Areas

| Area | Test Type | Purpose |
| --- | --- | --- |
| **Categories** | Unit / Integration / Manual | Verify category CRUD behavior |
| **Incomes** | Unit / Integration / Manual | Verify income CRUD behavior |
| **Expenses** | Unit / Integration / Manual | Verify expense CRUD behavior |
| **Budgets** | Unit / Integration / Manual | Verify budget CRUD behavior |
| **Monthly Summaries** | Unit / Integration / Manual | Verify summary calculations and display |
| **Validation** | Unit / Integration | Verify invalid input is rejected correctly |

---

## ✅ Core Test Scenarios

The following scenarios are especially important for v1:

* Create a valid category
* Reject a category with missing required fields
* Create a valid income entry
* Create a valid expense entry
* Create a valid budget entry
* Reject invalid numeric values
* Reject missing required fields
* Retrieve stored financial records correctly
* Update a financial record successfully
* Delete a financial record successfully
* Calculate total income for a selected month correctly
* Calculate total expenses for a selected month correctly
* Calculate remaining budget correctly
* Calculate net balance correctly
* Group expense totals by category correctly

---

## 🧮 Summary Calculation Test Focus

Financial summary testing should verify:

* Income totals are summed correctly
* Expense totals are summed correctly
* Budget totals are summed correctly
* Remaining budget is calculated correctly
* Net balance is calculated correctly
* Category spending totals are grouped correctly for the selected period
* Empty-month scenarios return safe and understandable results

---

## 🛡️ Validation Test Focus

Validation tests should verify:

* Required fields are enforced
* Amount fields reject invalid formats
* Amount fields reject disallowed negative values
* Date fields require valid values
* Month and year fields are validated correctly
* Duplicate monthly budgets for the same category are prevented if implemented as a business rule
* Invalid category references are handled correctly

---

## 🔧 Test Tools

| Tool | Purpose |
| --- | --- |
| **xUnit** | Backend unit and integration testing |
| **Swagger / OpenAPI** | Manual API testing |
| **Browser Developer Tools** | Frontend inspection and debugging |
| **React development environment** | Manual UI workflow testing |

Frontend automated testing tools may be added later if needed.

---

## 🚦 Entry and Exit Criteria

### Entry Criteria

Testing can begin when:

* Core entities and API endpoints exist
* Database access is functional
* Summary calculations have been implemented
* The frontend can submit and display financial data

### Exit Criteria

Testing for v1 is considered sufficient when:

* Core CRUD workflows function correctly
* Summary calculations return correct values
* Required validation rules are enforced
* Major blocking defects are resolved
* The primary v1 workflow can be completed successfully

---

## 🔄 Main Test Workflow

The main workflow that must be validated is:

```text
Create category → Add income → Add expense → Create budget → View monthly summary