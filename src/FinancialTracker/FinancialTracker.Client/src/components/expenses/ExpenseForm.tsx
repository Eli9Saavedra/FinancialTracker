import { useEffect, useState } from 'react';
import Input from '../ui/Input/Input';
import TextArea from '../ui/TextArea/TextArea';
import Button from '../ui/Button/Button';
import CategorySelect from '../categories/CategorySelect';
import { createExpense, updateExpense } from '../../api/expenses';
import type { Expense } from '../../types';

interface ExpenseFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    expense?: Expense;
}

function ExpenseForm({ onSuccess, onCancel, expense }: ExpenseFormProps) {
    const [merchant, setMerchant] = useState(expense?.merchant ?? '');
    const [amount, setAmount] = useState(expense?.amount.toString() ?? '0');
    const [dateSpent, setDateSpent] = useState(expense?.dateSpent ? expense.dateSpent.slice(0, 10) : '');
    const [categoryId, setCategoryId] = useState(expense?.categoryId ?? '');
    const [notes, setNotes] = useState(expense?.notes ?? '');
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        if (!merchant.trim()) {
            setError('Merchant is required');
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setError('Amount must be greater than 0');
            return;
        }
        if (!dateSpent) {
            setError('Date spent is required');
            return;
        }

        try {
            if (expense) {
                await updateExpense(expense.id, {
                    merchant,
                    amount: parseFloat(amount),
                    dateSpent,
                    categoryId: categoryId || undefined,
                    notes
                });
            } else {
                await createExpense({
                    merchant,
                    amount: parseFloat(amount),
                    dateSpent,
                    categoryId: categoryId || undefined,
                    notes
                });
            }
            onSuccess();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Something went wrong');
            }
        }
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Input id="merchant" label="Merchant" value={merchant} onChange={e => setMerchant(e.target.value)} />
            <Input id="amount" label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <Input id="dateSpent" label="Date Spent" type="date" value={dateSpent} onChange={e => setDateSpent(e.target.value)} />
            <CategorySelect id="categoryId" label="Category" value={categoryId} onChange={setCategoryId} />
            <TextArea id="notes" label="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
            <Button label='Save' onClick={handleSubmit} variant="primary" />
            <Button label="Cancel" onClick={onCancel} variant="secondary" />
        </div>
    )
}

export default ExpenseForm;