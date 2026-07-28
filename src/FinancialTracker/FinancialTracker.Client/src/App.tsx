import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import IncomePage from './pages/IncomePage';
import BudgetsPage from './pages/BudgetsPage';
import CategoriesPage from './pages/CategoriesPage';
import ExpensesPage from './pages/ExpensesPage';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'


function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/income" element={<IncomePage />} />
                        <Route path="/expenses" element={<ExpensesPage />} />
                        <Route path="/budgets" element={<BudgetsPage />} />
                    </Route>
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

export default App;