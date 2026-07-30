import { useEffect, useState } from 'react';
import { getMonthlySummary, getCategorySpending, getBudgetVsActual } from '../api/summaries';
import type { MonthlySummary, CategorySpending, BudgetVsActual } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner';
import ErrorBanner from '../components/ui/ErrorBanner/ErrorBanner';
import styles from '../pages/Dashboard.module.css';

function DashboardPage() {
    const now = new Date();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);
    const [categorySpending, setCategorySpending] = useState<CategorySpending[]>([]);
    const [budgetVsActual, setBudgetVsActual] = useState<BudgetVsActual[]>([]);

    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
    const yearOptions = [selectedYear - 2, selectedYear - 1, selectedYear, selectedYear + 1, selectedYear + 2];

    async function loadDashboard(month: number, year: number) {
        setLoading(true);
        setError(null);

        try {
            const [monthly, spending, vsActual] = await Promise.all([
                getMonthlySummary(month, year),
                getCategorySpending(month, year),
                getBudgetVsActual(month, year)
            ]);

            setMonthlySummary(monthly);
            setCategorySpending(spending);
            setBudgetVsActual(vsActual);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to load dashboard data');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDashboard(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorBanner message={error} />;

    const isEmpty =
        !monthlySummary &&
        categorySpending.length === 0 &&
        budgetVsActual.length === 0;

    return (
        <div className={styles.page}>
            <header className={styles.headerCard}>
                <h1>Dashboard</h1>
                <p className={styles.description}>Track your monthly financial overview</p>

                <section className={styles.periodRow} aria-label="Period selector">
                    <div className={styles.field}>
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
                    </div>

                    <div className={styles.field}>
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
                    </div>
                </section>
            </header>

            {isEmpty ? (
                <section className={styles.emptyState}>
                    <p>No dashboard data found for this period.</p>
                </section>
            ) : (
                <section className={styles.widgetsGrid}>
                    <article className={styles.widgetCard}>
                        <h2>Monthly Summary</h2>
                        <p className={styles.muted}>Widget placeholder</p>
                    </article>

                    <article className={styles.widgetCard}>
                        <h2>Category Spending</h2>
                        <p className={styles.muted}>Widget placeholder</p>
                    </article>

                    <article className={styles.widgetCard}>
                        <h2>Budget vs Actual</h2>
                        <p className={styles.muted}>Widget placeholder</p>
                    </article>
                </section>
            )}
        </div>
    );
}

export default DashboardPage;