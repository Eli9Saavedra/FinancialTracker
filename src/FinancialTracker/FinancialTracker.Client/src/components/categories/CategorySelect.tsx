import { useEffect, useState } from 'react';
import { getCategories } from '../../api/categories';
import type { Category } from '../../types';

interface CategorySelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    typeFilter?: number;
}

function CategorySelect({ id, label, value, onChange, typeFilter }: CategorySelectProps) {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then(data => setCategories(data));
    }, []);

    const filtered = typeFilter !== undefined
        ? categories.filter(c =>Number(c.type) === typeFilter)
        : categories;
  return (
      <div>
          <label htmlFor={id}>{label}</label>
          <select id={id} value={value} onChange={e => onChange(e.target.value)}>
              <option value="">None</option>
              {filtered.map(c => (
                  <option key={c.id} value={c.id} > {c.name}</option>
              ))}
          </select>
      </div>
  );
}

export default CategorySelect;