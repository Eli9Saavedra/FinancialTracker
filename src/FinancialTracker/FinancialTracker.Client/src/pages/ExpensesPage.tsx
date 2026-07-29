import { useEffect, useState } from 'react';
import { getExpenses, deleteExpense } from '../api/expenses';
import type { Expense } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner';
import ErrorBanner from '../components/ui/ErrorBanner/ErrorBanner';
import Table from '../components/ui/Table/Table';
import Button from '../components/ui/Button/Button';
import Modal from '../components/ui/Modal/Modal';
import ExpenseForm from '../components/expenses/ExpenseForm';

function ExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        getExpenses()
            .then(data => {
                setExpenses(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    function handleSuccess() {
        setIsModalOpen(false);
        setSelectedExpense(null);
        getExpenses().then(data => setExpenses(data));
    }

    async function handleDelete() {
        if (!expenseToDelete) return;

        try {
            await deleteExpense(expenseToDelete.id);
            setExpenses(prev => prev.filter(e => e.id !== expenseToDelete.id));
            setExpenseToDelete(null);
            setDeleteError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setDeleteError(err.message);
            } else {
                setDeleteError('Failed to delete income');
            }
        }
    }

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorBanner message={error} />

    return (
        <div>
            <div>
                <h1>Expenses</h1>
                <Button label="New Expense" onClick={() => { setSelectedExpense(null); setIsModalOpen(true) }} variant="primary" />
            </div>
            <Table
                columns={['Merchant', 'Amount', 'Date Spent', 'Category', 'Notes', 'Last Updated', 'Actions']}
                isEmpty={expenses.length === 0}
                emptyMessage="No expenses found"
            >
                {expenses.map(expense => (
                    <tr key={expense.id}>
                        <td>{expense.merchant}</td>
                        <td>{expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td>{new Date(expense.dateSpent).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td>{expense.categoryId ?? '-'}</td>
                        <td>{expense.notes ?? '-'}</td>
                        <td>{expense.updatedAt}</td>
                        <td>
                            <Button
                                label="Edit"
                                variant='secondary'
                                onClick={() => {
                                    setSelectedExpense(expense)
                                    setIsModalOpen(true)
                                } }
                            />
                            <Button
                                label='Delete'
                                variant="danger"
                                onClick={() => setExpenseToDelete(expense)}
                            />
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal
                isOpen={isModalOpen}
                title={selectedExpense ? 'Edit Expense' : 'New Expense'}
                onClose={() => {
                    setIsModalOpen(false); setSelectedExpense(null); }}
            >
                <ExpenseForm
                    onSuccess={handleSuccess}
                    onCancel={() => { setIsModalOpen(false); setSelectedExpense(null); }}
                    expense={selectedExpense ?? undefined}
                />
            </Modal>
            <Modal
                isOpen={expenseToDelete !== null}
                title="Delete Expense"
                onClose={() => { setExpenseToDelete(null); setDeleteError(null); }}
            >
                {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
                <p>Are you sure you want to delete <strong>{expenseToDelete?.merchant}</strong>?</p>
                <Button label="Delete" variant="danger" onClick={handleDelete} />
                <Button label="Cancel" variant="secondary" onClick={() => { setExpenseToDelete(null); setDeleteError(null); }} />
            </Modal>
        </div>
    )
}

export default ExpensesPage;