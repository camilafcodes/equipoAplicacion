import { Metadata } from 'next';
import { fetchNewsList } from '@/lib/api';
import NewsCard from '@/components/NewsCard';
import Pagination from '@/components/Pagination';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Latest News | News Web MVP',
  description: 'Stay updated with the latest news from around the web',
};

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const pageSize = 10;

  let newsData;
  let error;

  try {
    newsData = await fetchNewsList(currentPage, pageSize);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch news';
  }

  if (error || !newsData) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Latest News</h1>
        </header>
        <main className={styles.main}>
          <div className={styles.error}>
            <p>⚠️ {error || 'Failed to load news'}</p>
            <p className={styles.errorHint}>
              Make sure the API server is running at{' '}
              {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const totalPages = Math.ceil(newsData.total / newsData.pageSize);

  if (newsData.articles.length === 0) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Latest News</h1>
        </header>
        <main className={styles.main}>
          <div className={styles.empty}>
            <p>📰 No news articles available at the moment</p>
            <p className={styles.emptyHint}>Check back later for updates</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Latest News</h1>
        <p className={styles.subtitle}>
          Showing {newsData.articles.length} of {newsData.total} articles
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {newsData.articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/"
          />
        )}
      </main>
    </div>
  );
}
