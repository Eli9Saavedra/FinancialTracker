
interface InputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}


function Input({ id, label, value, onChange, placeholder, type = 'text' }: InputProps) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
  );
}

export default Input;