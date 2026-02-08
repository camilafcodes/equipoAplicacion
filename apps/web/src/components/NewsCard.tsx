import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@app/shared';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={styles.card}>
      <Link href={`/news/${article.id}`} className={styles.link}>
        {article.imageUrl && (
          <div className={styles.imageWrapper}>
            <Image
              src={article.imageUrl}
              alt={article.title}
              className={styles.image}
              width={400}
              height={200}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className={styles.content}>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.summary}>{article.summary}</p>
          <div className={styles.meta}>
            <span className={styles.source}>{article.source}</span>
            {article.author && (
              <>
                <span className={styles.separator}>•</span>
                <span className={styles.author}>{article.author}</span>
              </>
            )}
            <span className={styles.separator}>•</span>
            <time className={styles.date}>{publishedDate}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
