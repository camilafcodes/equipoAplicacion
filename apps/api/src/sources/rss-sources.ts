import Parser from 'rss-parser';
import { NewsArticle } from '@app/shared';
import crypto from 'crypto';

const parser = new Parser();

function generateArticleId(url: string, publishedDate: string): string {
  const hash = crypto.createHash('md5').update(`${url}-${publishedDate}`).digest('hex');
  return hash.substring(0, 16);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export async function fetchBBCNews(): Promise<NewsArticle[]> {
  try {
    const feed = await parser.parseURL('http://feeds.bbci.co.uk/news/rss.xml');
    
    const articles: NewsArticle[] = feed.items.map((item) => {
      const publishedAt = item.pubDate || new Date().toISOString();
      const url = item.link || '';
      const id = generateArticleId(url, publishedAt);

      const contentSnippet = item.contentSnippet || item.content || '';
      const summary = stripHtml(contentSnippet).substring(0, 200);
      const content = stripHtml(item.content || contentSnippet || item.title || '');

      return {
        id,
        title: item.title || 'Untitled',
        summary: summary || 'No summary available',
        content: content || 'No content available',
        author: item.creator || undefined,
        publishedAt: new Date(publishedAt).toISOString(),
        source: 'BBC News',
        url: url || undefined,
        imageUrl: item.enclosure?.url || undefined,
      };
    });

    return articles;
  } catch (error) {
    console.error('Error fetching BBC News:', error);
    return [];
  }
}

export async function fetchTechCrunch(): Promise<NewsArticle[]> {
  try {
    const feed = await parser.parseURL('https://techcrunch.com/feed/');
    
    const articles: NewsArticle[] = feed.items.map((item) => {
      const publishedAt = item.pubDate || new Date().toISOString();
      const url = item.link || '';
      const id = generateArticleId(url, publishedAt);

      const contentSnippet = item.contentSnippet || item.content || '';
      const summary = stripHtml(contentSnippet).substring(0, 200);
      const content = stripHtml(item.content || contentSnippet || item.title || '');

      return {
        id,
        title: item.title || 'Untitled',
        summary: summary || 'No summary available',
        content: content || 'No content available',
        author: item.creator || undefined,
        publishedAt: new Date(publishedAt).toISOString(),
        source: 'TechCrunch',
        url: url || undefined,
        imageUrl: item.enclosure?.url || undefined,
      };
    });

    return articles;
  } catch (error) {
    console.error('Error fetching TechCrunch:', error);
    return [];
  }
}
