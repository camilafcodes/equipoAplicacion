import { NewsArticle, NewsListResponse, ErrorResponse } from '@app/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ErrorResponse;
    try {
      errorData = await response.json();
    } catch {
      throw new ApiError(
        'UNKNOWN_ERROR',
        `HTTP ${response.status}: ${response.statusText}`
      );
    }
    
    throw new ApiError(
      errorData.error.code,
      errorData.error.message,
      errorData.error.details
    );
  }

  return response.json();
}

export async function fetchNewsList(
  page: number = 1,
  pageSize: number = 10
): Promise<NewsListResponse> {
  const url = new URL(`${API_BASE_URL}/api/news`);
  url.searchParams.set('page', page.toString());
  url.searchParams.set('pageSize', pageSize.toString());

  const response = await fetch(url.toString(), {
    cache: 'no-store',
  });

  return handleResponse<NewsListResponse>(response);
}

export async function fetchArticle(id: string): Promise<NewsArticle> {
  const url = `${API_BASE_URL}/api/news/${encodeURIComponent(id)}`;

  const response = await fetch(url, {
    cache: 'no-store',
  });

  return handleResponse<NewsArticle>(response);
}

export { ApiError };
