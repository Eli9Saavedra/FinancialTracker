/**
 * useState - Stores a value that can change - e.g. the list of categories
 * useEffect - Runs code when teh component loads - e.g. fetch data on page open
 */
import { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../api/categories';
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
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

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
        setSelectedCategory(null);
        getCategories().then(data => setCategories(data));
    }

    async function handleDelete() {
        if (!categoryToDelete) return;

        try {
            await deleteCategory(categoryToDelete.id);
            setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id));
            setCategoryToDelete(null);
            setDeleteError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setDeleteError(err.message);
            } else {
                setDeleteError('Failed to delete category');
            }
        }
    }

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorBanner message={error} />

    return (
        <div>
            <div>
                <h1>Categories</h1>
                <Button label="New Category" onClick={() => { setSelectedCategory(null); setIsModalOpen(true) }} variant="primary" />
            </div>
            <Table
                columns={['Name', 'Type', 'Description', 'Last Updated', 'Actions']}
                isEmpty={categories.length === 0}
                emptyMessage="No categories found"
            >
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>{category.type}</td>
                        <td>{category.description ?? '-'}</td>
                        <td>{category.updatedAt}</td>
                        <td>
                            <Button
                                label="Edit"
                                variant="secondary"
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setIsModalOpen(true);
                                }}
                            />
                            <Button
                                label="Delete"
                                variant="danger"
                                onClick={() => setCategoryToDelete(category)}
                            />
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal
                isOpen={isModalOpen}
                title={selectedCategory ? 'Edit Category' : 'New Category'}
                onClose={() => {
                    setIsModalOpen(false); setSelectedCategory(null); }}
            >
                <CategoryForm onSuccess={handleSuccess}
                    onCancel={() => { setIsModalOpen(false); setSelectedCategory(null); }}
                              category={selectedCategory ?? undefined}
                />
            </Modal>
            <Modal
                isOpen={categoryToDelete !== null}
                title="Delete Category"
                onClose={() => { setCategoryToDelete(null); setDeleteError(null); }}
            >
                {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
                <p>Are you sure you want to delete <strong>{categoryToDelete?.name}</strong>?</p>
                <Button label="Delete" variant="danger" onClick={handleDelete} />
                <Button label="Cancel" variant='secondary' onClick={() => { setCategoryToDelete(null); setDeleteError(null); }} />
            </Modal>
        </div>
    )
}

export default CategoriesPage;