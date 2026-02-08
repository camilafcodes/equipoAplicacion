import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl = '' }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: (number | string)[] = [];
  const showEllipsis = totalPages > 7;

  if (showEllipsis) {
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pages.push(i);
      }
      if (totalPages > 5) {
        pages.push('...');
        pages.push(totalPages);
      }
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = Math.max(totalPages - 4, 2); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  const buildUrl = (page: number) => {
    const url = new URL(baseUrl || '/', 'http://localhost');
    url.searchParams.set('page', page.toString());
    return `${url.pathname}${url.search}`;
  };

  return (
    <nav className={styles.pagination}>
      {currentPage > 1 && (
        <Link href={buildUrl(currentPage - 1)} className={styles.button}>
          ← Previous
        </Link>
      )}

      <div className={styles.pages}>
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrent = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={buildUrl(pageNum)}
              className={`${styles.pageButton} ${isCurrent ? styles.active : ''}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages && (
        <Link href={buildUrl(currentPage + 1)} className={styles.button}>
          Next →
        </Link>
      )}
    </nav>
  );
}
