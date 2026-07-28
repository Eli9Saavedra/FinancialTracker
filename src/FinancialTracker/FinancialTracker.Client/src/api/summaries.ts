import { apiFetch } from './client';
import type { MonthlySummary, CategorySpending, BudgetVsActual } from '../types';

export function getMonthlySummary(month: number, year: number): Promise<MonthlySummary> {
    return apiFetch<MonthlySummary>(`/api/summaries/monthly?month=${month}&year=${year}`);
}
export function getCategorySpending(month: number, year: number): Promise<CategorySpending[]> {
    return apiFetch<CategorySpending[]>(`/api/summaries/categories?month=${month}&year=${year}`);
}
export function getBudgetVsActual(month: number, year: number): Promise<BudgetVsActual[]> {
    return apiFetch<BudgetVsActual[]>(`/api/summaries/budget-vs-actual?month=${month}&year=${year}`);
}


