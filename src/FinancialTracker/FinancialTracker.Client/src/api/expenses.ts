import { apiFetch } from './client'
import type { Expense } from '../types'

export function getExpenses(): Promise<Expense[]> {
    return apiFetch<Expense[]>('/api/expenses');
}

export function getExpenseById(id: string): Promise<Expense> {
    return apiFetch<Expense>(`/api/expenses/${id}`);
}

export function createExpense(data: { merchant: string; amount: number; dateSpent: string; categoryId?: string; notes?: string; }): Promise<Expense> {
    return apiFetch<Expense>('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function updateExpense(id: string, data: { merchant: string; amount: number; dateSpent: string; categoryId?: string; notes?: string; }): Promise<Expense> {
    return apiFetch<Expense>(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function deleteExpense(id: string): Promise<void> {
    return apiFetch<void>(`/api/expenses/${id}`, {
        method: 'DELETE'
    });
}