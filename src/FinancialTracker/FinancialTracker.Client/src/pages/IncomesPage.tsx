import { useEffect, useState } from 'react';
import { getIncomes, deleteIncome } from '../api/incomes';
import type { Income } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner';
import ErrorBanner from '../components/ui/ErrorBanner/ErrorBanner';
import Table from '../components/ui/Table/Table';
import Button from '../components/ui/Button/Button';
import Modal from '../components/ui/Modal/Modal';
import IncomeForm from '../components/incomes/IncomeForm';
function IncomesPage() {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
    const [incomeToDelete, setIncomeToDelete] = useState<Income | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    

    useEffect(() => {
        getIncomes()
            .then(data => {
                setIncomes(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    function handleSuccess() {
        setIsModalOpen(false);
        setSelectedIncome(null);
        getIncomes().then(data => setIncomes(data));
    }

    async function handleDelete() {
        if (!incomeToDelete) return;

        try {
            await deleteIncome(incomeToDelete.id);
            setIncomes(prev => prev.filter(i => i.id !== incomeToDelete.id));
            setIncomeToDelete(null);
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
                <h1>Incomes</h1>
                <Button label="New Income" onClick={() => { setSelectedIncome(null); setIsModalOpen(true) }} variant="primary" />
            </div>
            <Table
                columns={['Source', 'Amount', 'Date Received', 'Category', 'Notes', 'Last Updated', 'Actions']}
                isEmpty={incomes.length === 0}
                emptyMessage="No incomes found"
            >
                {incomes.map(income => (
                    <tr key={income.id}>
                        <td>{income.source}</td>
                        <td>{income.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td>{new Date(income.dateReceived).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td>{income.categoryId ?? '-'}</td>
                        <td>{income.notes ?? '-'}</td>
                        <td>{income.updatedAt}</td>
                        <td>
                            <Button
                                label="Edit"
                                variant='secondary'
                                onClick={() => {
                                    setSelectedIncome(income)
                                    setIsModalOpen(true)
                                }}
                            />
                            <Button
                                label='Delete'
                                variant="danger"
                                onClick={() => setIncomeToDelete(income)}
                            />
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal
                isOpen={isModalOpen}
                title={selectedIncome ? 'Edit Income' : 'New Income'}
                onClose={() => {
                    setIsModalOpen(false); setSelectedIncome(null); }}
            >
                <IncomeForm
                    onSuccess={handleSuccess}
                    onCancel={() => { setIsModalOpen(false); setSelectedIncome(null); }}
                    income={selectedIncome ?? undefined}
                />
            </Modal>
            <Modal
                isOpen={incomeToDelete !== null}
                title="Delete Income"
                onClose={() => { setIncomeToDelete(null); setDeleteError(null); }}
            >
                {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
                <p>Are you sure you want to delete <strong>{incomeToDelete?.source}</strong>?</p>
                <Button label="Delete" variant="danger" onClick={handleDelete} />
                <Button label="Cancel" variant='secondary' onClick={() => { setIncomeToDelete(null); setDeleteError(null); }} />
            </Modal>
        </div>
    )

}
export default IncomesPage;