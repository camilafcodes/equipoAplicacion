import { Metadata } from 'next';
import Link from 'next/link';
import { fetchArticle } from '@/lib/api';
import NewsDetail from '@/components/NewsDetail';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const article = await fetchArticle(id);
    return {
      title: `${article.title} | News Web MVP`,
      description: article.summary,
    };
  } catch {
    return {
      title: 'Article Not Found | News Web MVP',
      description: 'The requested article could not be found',
    };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  let article;
  let error;

  try {
    article = await fetchArticle(id);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to fetch article';
  }

  if (error || !article) {
    return (
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Back to news
        </Link>
        <main className={styles.main}>
          <div className={styles.error}>
            <h1>Article Not Found</h1>
            <p>{error || 'The article you are looking for does not exist'}</p>
            <Link href="/" className={styles.homeLink}>
              Return to home page
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to news
      </Link>
      <main className={styles.main}>
        <NewsDetail article={article} />
      </main>
    </div>
  );
}
