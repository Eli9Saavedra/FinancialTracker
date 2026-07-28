import styles from './Button.module.css'

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant ?: 'primary' | 'secondary' | 'danger';
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[variant]}`}>
            {label}
        </button>
    )
}

export default Button;