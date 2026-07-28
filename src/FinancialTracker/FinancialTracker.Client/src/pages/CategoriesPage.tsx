/**
 * useState - Stores a value that can change - e.g. the list of categories
 * useEffect - Runs code when teh component loads - e.g. fetch data on page open
 */
import { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';
import type { Category } from '../types';


function CategoriesPage() {
    /**
     * categories - starts as an empty array
     * setCategories - call this to update the list
     * <Category[]> - tells TypeScript what type the array holds
     */
    const [categories, setCategories] = useState<Category[]>([]);

    /**
     * useEffect - Runs once the component loads 9empty [] dependency array)
     * getCategories() - calls the API and returns a Promise
     * .then(data => setCategories(data)) - when the response arrives, store it in state
     */
    useEffect(() => {
        getCategories().then(data => setCategories(data));
    }, []);
    return (
        <p>Loaded {categories.length} categories</p>
  );
}

export default CategoriesPage;