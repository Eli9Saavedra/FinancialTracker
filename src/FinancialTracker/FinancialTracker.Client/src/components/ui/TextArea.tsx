
interface TextAreaProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
}

function TextArea({ id, label, value, onChange, placeholder, rows }: TextAreaProps) {
  return (
      <div>
          <label htmlFor={id}>{label}</label>
          <textarea
              id={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              rows={rows}
          />
      </div>
  );
}

export default TextArea;