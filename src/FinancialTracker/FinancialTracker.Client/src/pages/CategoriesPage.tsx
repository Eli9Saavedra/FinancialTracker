/**
 * useState - Stores a value that can change - e.g. the list of categories
 * useEffect - Runs code when teh component loads - e.g. fetch data on page open
 */
import { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';
import type { Category } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner/LoadingSpinner';
import ErrorBanner from '../components/ui/ErrorBanner/ErrorBanner';
import Table from '../components/ui/Table/Table';
import Button from '../components/ui/Button/Button';
import Modal from '../components/ui/Modal/Modal';
import CategoryForm from '../components/categories/CategoryForm';


function CategoriesPage() {
    
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * useEffect - Runs once the component loads 9empty [] dependency array)
     * getCategories() - calls the API and returns a Promise
     * .then(data => setCategories(data)) - when the response arrives, store it in state
     */
    useEffect(() => {
        getCategories()
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    function handleSuccess() {
        setIsModalOpen(false);
        getCategories().then(data => setCategories(data));
    }

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorBanner message={error} />

    return (
        <div>
            <div>
                <h1>Categories</h1>
                <Button label="New Category" onClick={() => setIsModalOpen(true)} variant="primary" />
            </div>
            <Table
                columns={['Name', 'Type', 'Description', 'Last Updated']}
                isEmpty={categories.length === 0}
                emptyMessage="No categories found"
            >
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>{category.type}</td>
                        <td>{category.description ?? '-'}</td>
                        <td>{category.updatedAt}</td>
                    </tr>
                ))}
            </Table>
            <Modal
                isOpen={isModalOpen}
                title="New Category"
                onClose={() => setIsModalOpen(false)}
            >
                <CategoryForm onSuccess={handleSuccess} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    )
}

export default CategoriesPage;