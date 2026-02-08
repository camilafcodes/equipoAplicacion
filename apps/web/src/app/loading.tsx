import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.subtitleSkeleton}></div>
      </header>
      <main className={styles.main}>
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.cardSkeleton}>
              <div className={styles.imageSkeleton}></div>
              <div className={styles.contentSkeleton}>
                <div className={styles.titleLineSkeleton}></div>
                <div className={styles.titleLineSkeleton}></div>
                <div className={styles.summarySkeleton}></div>
                <div className={styles.summarySkeleton}></div>
                <div className={styles.metaSkeleton}></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
