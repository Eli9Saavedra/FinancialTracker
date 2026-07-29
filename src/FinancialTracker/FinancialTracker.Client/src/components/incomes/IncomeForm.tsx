import { useState } from 'react';
import Input from '../ui/Input/Input';
import TextArea from '../ui/TextArea/TextArea';
import Button from '../ui/Button/Button';
import CategorySelect from '../categories/CategorySelect';
import { createIncome } from '../../api/incomes';
import type { Income } from '../../types';

interface IncomeFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    income?: Income;
}

function IncomeForm({ onSuccess, onCancel, income }: IncomeFormProps) {
    const [source, setSource] = useState(income?.source ?? '');
    const [amount, setAmount] = useState(income?.amount.toString() ?? '0');
    const [dateReceived, setDateReceived] = useState(income?.dateReceived ?? '');
    const [categoryId, setCategoryId] = useState(income?.categoryId ?? '');
    const [notes, setNotes] = useState(income?.notes ?? '');
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        if (!source.trim()) {
            setError('Source is required');
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setError('Amount must be greater than 0');
            return;
        }
        if (!dateReceived) {
            setError('Date received is required');
            return;
        }

        try {
            await createIncome({
                source,
                amount: parseFloat(amount),
                dateReceived,
                categoryId: categoryId || undefined,
                notes
            });
            onSuccess();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Input id="source" label="Source" value={source} onChange={e => setSource(e.target.value)} />
            <Input id="amount" label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <Input id="dateReceived" label="Date Received" type="date" value={dateReceived} onChange={e => setDateReceived(e.target.value)} />
            <CategorySelect id="categoryId" label="Category" value={categoryId} onChange={setCategoryId} />
            <TextArea id="notes" label="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
            <Button label="Save" onClick={handleSubmit} variant="primary" />
            <Button label="Cancel" onClick={onCancel} variant="secondary" />
        </div>
    )
}

export default IncomeForm;