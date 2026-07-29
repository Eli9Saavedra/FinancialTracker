import { useEffect, useState } from 'react';
import { getBudgets } from '../api/budgets';
import { getCategories } from '../api/categories';
import type { Budget, Category } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner';
import ErrorBanner from '../components/ui/ErrorBanner/ErrorBanner';
import Table from '../components/ui/Table/Table';
import Button from '../components/ui/Button/Button';
import Modal from '../components/ui/Modal/Modal';
import BudgetForm from '../components/budgets/BudgetForm';

function BudgetsPage() {
    const now = new Date();

    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
    const yearOptions = [selectedYear - 2, selectedYear - 1, selectedYear, selectedYear + 1, selectedYear + 2];

    function getCategoryName(categoryId: string) {
        return categories.find(c => c.id === categoryId)?.name ?? categoryId;
    }

    function loadBudgets(month: number, year: number) {
        setLoading(true);
        setError(null);

        getBudgets(month, year)
            .then(data => {
                setBudgets(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        getCategories()
            .then(data => setCategories(data))
            .catch(() => { });

        loadBudgets(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    function handleCreateSuccess() {
        setIsModalOpen(false);
        loadBudgets(selectedMonth, selectedYear);
    }

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorBanner message={error} />;

    return (
        <div>
            <div>
                <h1>Budgets</h1>
                <label htmlFor="month">Month</label>
                <select
                    id="month"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(Number(e.target.value))}
                >
                    {monthOptions.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <label htmlFor="year">Year</label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={e => setSelectedYear(Number(e.target.value))}
                >
                    {yearOptions.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
                <Button label="New Budget" onClick={() => setIsModalOpen(true)} variant="primary" />
            </div>

            <Table
                columns={['Category', 'Amount', 'Month', 'Year', 'Notes']}
                isEmpty={budgets.length === 0}
                emptyMessage="No budgets found"
            >
                {budgets.map(budget => (
                    <tr key={budget.id}>
                        <td>{getCategoryName(budget.categoryId)}</td>
                        <td>{budget.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td>{budget.month}</td>
                        <td>{budget.year}</td>
                        <td>{budget.notes ?? '-'}</td>
                    </tr>
                ))}
            </Table>

            <Modal
                isOpen={isModalOpen}
                title="New Budget"
                onClose={() => setIsModalOpen(false)}
            >
                <BudgetForm
                    defaultMonth={selectedMonth}
                    defaultYear={selectedYear}
                    onSuccess={handleCreateSuccess}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}

export default BudgetsPage;