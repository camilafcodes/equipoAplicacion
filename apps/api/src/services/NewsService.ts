import { NewsArticle, NewsListResponse } from '@app/shared';
import { Cache } from '../utils/cache';
import { fetchBBCNews, fetchTechCrunch } from '../sources/rss-sources';
import { getMockNews } from '../sources/mock-data';
import { AppError } from '../middleware/errorHandler';

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes in milliseconds
const CACHE_KEY = 'all-news';
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true';

export class NewsService {
  private cache: Cache<NewsArticle[]>;

  constructor() {
    this.cache = new Cache<NewsArticle[]>();
  }

  private async fetchAllNews(): Promise<NewsArticle[]> {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for news articles');
        return getMockNews();
      }

      const [bbcArticles, techCrunchArticles] = await Promise.all([
        fetchBBCNews(),
        fetchTechCrunch(),
      ]);

      const allArticles = [...bbcArticles, ...techCrunchArticles];
      
      // If no articles from RSS feeds, fallback to mock data
      if (allArticles.length === 0) {
        console.log('No articles from RSS feeds, using mock data');
        return getMockNews();
      }

      // Sort by publishedAt descending (newest first)
      allArticles.sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });

      return allArticles;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new AppError('INTERNAL_ERROR', 'Failed to fetch news', 500);
    }
  }

  private async getArticles(): Promise<NewsArticle[]> {
    const cached = this.cache.get(CACHE_KEY);
    if (cached) {
      return cached;
    }

    const articles = await this.fetchAllNews();
    this.cache.set(CACHE_KEY, articles, CACHE_TTL);
    return articles;
  }

  async getNewsList(page: number, pageSize: number): Promise<NewsListResponse> {
    const articles = await this.getArticles();
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArticles = articles.slice(startIndex, endIndex);

    return {
      articles: paginatedArticles,
      total: articles.length,
      page,
      pageSize,
    };
  }

  async getArticleById(id: string): Promise<NewsArticle> {
    const articles = await this.getArticles();
    const article = articles.find((a) => a.id === id);

    if (!article) {
      throw new AppError('NOT_FOUND', 'Article not found', 404);
    }

    return article;
  }
}
