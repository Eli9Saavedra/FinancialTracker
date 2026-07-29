import { useEffect, useState } from 'react';
import { getIncomes } from '../api/incomes';
import type { Income } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner';
import ErrorBanner from '../components/ui/ErrorBanner/ErrorBanner';
import Table from '../components/ui/Table/Table';
import Button from '../components/ui/Button/Button';
function IncomesPage() {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

   

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorBanner message={error} />

    return (
        <div>
            <div>
                <h1>Incomes</h1>
                <Button label="New Income" onClick={() => { } } variant="primary" />
            </div>
            <Table
                columns={['Source', 'Amount', 'Date Received', 'Category', 'Notes']}
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
                    </tr>
                ))}
            </Table>
        </div>
    )

}
export default IncomesPage;