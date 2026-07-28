import { useState } from 'react';
import Input from '../ui/Input/Input';
import Select from '../ui/Select/Select';
import TextArea from '../ui/TextArea/TextArea';
import Button from '../ui/Button/Button';
import { createCategory, updateCategory } from '../../api/categories';
import type { Category } from '../../types';

interface CategoryFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    category?: Category;
}

function CategoryForm({ onSuccess, onCancel, category }: CategoryFormProps) {
    const [name, setName] = useState(category?.name ?? '');
    const [type, setType] = useState(category?.type?.toString() ?? '0');
    const [description, setDescription] = useState(category?.description ?? '');
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        if (!name.trim()) {
            setError('Name is required');
            return;
        }

        try {
            if (category) {
                await updateCategory(category.id, { name, type: parseInt(type), description });
            } else {
                await createCategory({ name, type: parseInt(type), description });
            }
            onSuccess();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
    }

  return (
      <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Input id="name" label="Name" value={name} onChange={e => setName(e.target.value)} />
          <Select
              id="type"
              label="Type"
              value={type}
              onChange={e => setType(e.target.value)}
              options={[
                  { value: '0', label: 'Expense' },
                  { value: '1', label: 'Income' },
                  { value: '2', label: 'Both' },

              ]}
          />
          <TextArea id="description" label="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <Button label="Save" onClick={handleSubmit} variant="primary" />
          <Button label="Cancel" onClick={onCancel} variant="secondary" />
      </div>
  );
}

export default CategoryForm;