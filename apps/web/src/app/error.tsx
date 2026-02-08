'use client';

import Link from 'next/link';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1>⚠️ Something went wrong</h1>
        <p>{error.message || 'An unexpected error occurred'}</p>
        <div className={styles.actions}>
          <button onClick={reset} className={styles.retryButton}>
            Try again
          </button>
          <Link href="/" className={styles.homeLink}>
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
