export interface Category {
    id: string;
    name: string;
    type: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Income {
    id: string;
    source: string;
    amount: number;
    dateReceived: string;
    categoryId?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Expense {
    id: string;
    merchant: string;
    amount: number;
    dateSpent: string;
    categoryId?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Budget {
    id: string;
    categoryId: string;
    amount: number;
    month: number;
    year: number;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface MonthlySummary {
    month: number;
    year: number;
    totalIncome: number;
    totalExpenses: number;
    totalBudget: number;
    remainingBudget: number;
    netBalance: number;
}

export interface CategorySpending {
    categoryId: string;
    categoryName: string;
    totalSpent: number;
}

export interface BudgetVsActual {
    categoryId: string;
    categoryName: string;
    budgeted: number;
    actual: number;
    remaining: number;
}

