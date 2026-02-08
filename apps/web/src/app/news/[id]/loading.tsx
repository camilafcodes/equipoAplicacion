import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.backLinkSkeleton}></div>
      <main className={styles.main}>
        <div className={styles.imageSkeleton}></div>
        <div className={styles.headerSkeleton}>
          <div className={styles.titleLineSkeleton}></div>
          <div className={styles.titleLineSkeleton}></div>
          <div className={styles.metaSkeleton}></div>
        </div>
        <div className={styles.contentSkeleton}>
          <div className={styles.summarySkeleton}></div>
          <div className={styles.bodySkeleton}></div>
          <div className={styles.bodySkeleton}></div>
          <div className={styles.bodySkeleton}></div>
        </div>
      </main>
    </div>
  );
}
