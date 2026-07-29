import { useState } from 'react';
import Input from '../ui/Input/Input';
import TextArea from '../ui/TextArea/TextArea';
import Button from '../ui/Button/Button';
import CategorySelect from '../categories/CategorySelect';
import { createBudget, updateBudget } from '../../api/budgets';
import { ApiError } from '../../api/client';
import type { Budget } from '../../types';

interface BudgetFormProps {
    defaultMonth: number;
    defaultYear: number;
    onSuccess: () => void;
    onCancel: () => void;
    budget?: Budget;
}

function BudgetForm({ defaultMonth, defaultYear, onSuccess, onCancel, budget }: BudgetFormProps) {
    const [categoryId, setCategoryId] = useState(budget?.categoryId ?? '');
    const [amount, setAmount] = useState(budget ? budget.amount.toString() : '0');
    const [month, setMonth] = useState((budget?.month ?? defaultMonth).toString());
    const [year, setYear] = useState((budget?.year ?? defaultYear).toString());
    const [notes, setNotes] = useState(budget?.notes ?? '');
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        if (!categoryId) {
            setError('Category is required');
            return;
        }

        const parsedAmount = parseFloat(amount);
        if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Amount must be greater than 0');
            return;
        }

        const parsedMonth = Number(month);
        if (!month || Number.isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
            setError('Month must be between 1 and 12');
            return;
        }

        const parsedYear = Number(year);
        if (!year || Number.isNaN(parsedYear) || parsedYear < 1900 || parsedYear > 2100) {
            setError('Year must be between 1900 and 2100');
            return;
        }

        try {
            if (budget) {
                await updateBudget(budget.id, {
                    categoryId,
                    amount: parsedAmount,
                    month: parsedMonth,
                    year: parsedYear,
                    notes: notes.trim() ? notes : undefined
                });
            } else {
                await createBudget({
                    categoryId,
                    amount: parsedAmount,
                    month: parsedMonth,
                    year: parsedYear,
                    notes: notes.trim() ? notes : undefined
                });
            }

            onSuccess();
        } catch (err: unknown) {
            if (err instanceof ApiError && err.status === 409) {
                setError('A budget already exists for this category, month, and year. Try editing the existing budget, or change the values and retry.');
                return;
            }

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(budget ? 'Failed to update budget' : 'Failed to create budget');
            }
        }
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <CategorySelect
                id="categoryId"
                label="Category"
                value={categoryId}
                onChange={setCategoryId}
                typeFilters={[1, 2]}
            />
            <Input id="amount" label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <Input id="month" label="Month" type="number" value={month} onChange={e => setMonth(e.target.value)} />
            <Input id="year" label="Year" type="number" value={year} onChange={e => setYear(e.target.value)} />
            <TextArea id="notes" label="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
            <Button label="Save" onClick={handleSubmit} variant="primary" />
            <Button label="Cancel" onClick={onCancel} variant="secondary" />
        </div>
    );
}

export default BudgetForm;