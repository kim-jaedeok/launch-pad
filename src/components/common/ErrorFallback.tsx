import styles from './ErrorFallback.module.css';

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorFallback({
  message = 'Something went wrong',
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>!</div>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
