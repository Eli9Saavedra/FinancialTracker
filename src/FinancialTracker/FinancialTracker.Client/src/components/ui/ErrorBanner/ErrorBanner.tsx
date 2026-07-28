import styles from './ErrorBanner.module.css';

interface ErrorBannerProps {
    message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
    return (
        <div className={styles.banner} role="alert">
            <strong>Something went wrong</strong> {message}
        </div>
    );
}