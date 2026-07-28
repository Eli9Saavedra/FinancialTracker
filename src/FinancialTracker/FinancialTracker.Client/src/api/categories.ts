import { apiFetch } from './client'
import type { Category } from '../types'

export function getCategories(): Promise<Category[]> {
    return apiFetch<Category[]>('/api/categories');
}

export function getCategoryById(id: string): Promise<Category> {
    return apiFetch<Category>(`/api/categories/${id}`);
}

export function createCategory(data: { name: string; type: number; description?: string; }): Promise<Category> {
    return apiFetch<Category>('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function updateCategory(id: string, data: { name: string; type: number; description?: string; }): Promise<Category> {
    return apiFetch<Category>(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function deleteCategory(id: string): Promise<void> {
    return apiFetch<void>(`/api/categories/${id}`, {
        method: 'DELETE'
    });
}