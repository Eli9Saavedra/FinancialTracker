import { useState } from 'react';
import { createCategory } from '../../api/categories';
import Input from '../ui/Input/Input';
import Select from '../ui/Select/Select';
import TextArea from '../ui/TextArea/TextArea';
import Button from '../ui/Button/Button';

interface CategoryFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

function CategoryForm({ onSuccess, onCancel }: CategoryFormProps) {
    const [name, setName] = useState('');
    const [type, setType] = useState('0');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        if (!name.trim()) {
            setError('Name is required');
            return;
        }

        try {
            await createCategory({ name, type: parseInt(type), description });
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