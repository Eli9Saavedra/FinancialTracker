import { apiFetch } from './client'
import type { Budget } from '../types'

export function getBudgets(selectedMonth: number, selectedYear: number): Promise<Budget[]> {
    return apiFetch<Budget[]>(`/api/budgets?month=${selectedMonth}&year=${selectedYear}`);
}

export function getBudgetById(id: string): Promise<Budget> {
    return apiFetch<Budget>(`/api/budgets/${id}`);
}

export function createBudget(data: { categoryId: string; amount: number; month: number; year: number; notes?: string; }): Promise<Budget> {
    return apiFetch<Budget>('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function updateBudget(id: string, data: { categoryId: string; amount: number; month: number; year: number; notes?: string; }): Promise<Budget> {
    return apiFetch<Budget>(`/api/budgets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function deleteBudget(id: string): Promise<void> {
    return apiFetch<void>(`/api/budgets/${id}`, {
        method: 'DELETE'
    });
}