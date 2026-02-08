export interface HealthResponse {
  status: 'ok';
  timestamp: string;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author?: string;
  publishedAt: string;
  source: string;
  url?: string;
  imageUrl?: string;
}

export interface NewsListResponse {
  articles: NewsArticle[];
  total: number;
  page: number;
  pageSize: number;
}
