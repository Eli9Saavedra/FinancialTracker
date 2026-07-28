
interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
}
function Select({ id, label, value, onChange, options }: SelectProps) {
  return (
      <div>
          <label htmlFor={id}>{label}</label>
          <select id={id} value={value} onChange={onChange}>
              {options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
          </select>
      </div>
  );
}

export default Select;