import { apiFetch } from './client'
import type { Income } from '../types'

export function getIncomes(): Promise<Income[]> {
    return apiFetch<Income[]>('/api/incomes');
}

export function getIncomeById(id: string): Promise<Income> {
    return apiFetch<Income>(`/api/incomes/${id}`);
}

export function createIncome(data: { source: string; amount: number; dateReceived: string; categoryId?: string; notes?: string; }): Promise<Income> {
    return apiFetch<Income>('/api/incomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function updateIncome(id: string, data: { source: string; amount: number; dateReceived: string; categoryId?: string; notes?: string; }): Promise<Income> {
    return apiFetch<Income>(`/api/incomes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function deleteIncome(id: string): Promise<void> {
    return apiFetch<void>(`/api/incomes/${id}`, {
        method: 'DELETE'
    })
}