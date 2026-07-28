import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
    message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
    return (
        <div className={styles.spinnerWrapper} aria-busy="true">
            <div className={styles.spinner} />
            <p>{message}</p>
        </div>
    );
}