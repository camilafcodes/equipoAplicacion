import Image from 'next/image';
import { NewsArticle } from '@app/shared';
import styles from './NewsDetail.module.css';

interface NewsDetailProps {
  article: NewsArticle;
}

export default function NewsDetail({ article }: NewsDetailProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className={styles.article}>
      {article.imageUrl && (
        <div className={styles.imageWrapper}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            className={styles.image}
            width={800}
            height={400}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <div className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.meta}>
          <span className={styles.source}>{article.source}</span>
          {article.author && (
            <>
              <span className={styles.separator}>•</span>
              <span className={styles.author}>By {article.author}</span>
            </>
          )}
          <span className={styles.separator}>•</span>
          <time className={styles.date}>{publishedDate}</time>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.summary}>{article.summary}</p>
        <div className={styles.body}>
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
          >
            Read original article →
          </a>
        )}
      </div>
    </article>
  );
}
