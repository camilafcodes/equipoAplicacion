# API Contract

Base URL (development): `http://localhost:3001`

All responses are JSON. All timestamps are ISO 8601 strings.

## Response Types

### Success Response
Varies by endpoint (see below).

### Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

**Common Error Codes**:
- `VALIDATION_ERROR` (400): Invalid input parameters
- `NOT_FOUND` (404): Resource not found
- `INTERNAL_ERROR` (500): Server error

---

## Endpoints

### Health Check

**GET** `/health`

Returns API health status.

**Response** (200):
```json
{
  "status": "ok",
  "timestamp": "2026-02-08T18:00:00.000Z"
}
```

**TypeScript Type**: `HealthResponse` from `@app/shared`

---

### List News Articles

**GET** `/api/news`

Returns a paginated list of news articles.

**Query Parameters**:
- `page` (optional, number, default: 1): Page number (1-indexed)
- `pageSize` (optional, number, default: 10, max: 50): Items per page

**Response** (200):
```json
{
  "articles": [
    {
      "id": "article-123",
      "title": "Breaking News Title",
      "summary": "Short summary of the article...",
      "content": "Full article content here...",
      "author": "John Doe",
      "publishedAt": "2026-02-08T12:00:00.000Z",
      "source": "Example News",
      "url": "https://example.com/article",
      "imageUrl": "https://example.com/image.jpg"
    }
  ],
  "total": 42,
  "page": 1,
  "pageSize": 10
}
```

**TypeScript Type**: `NewsListResponse` from `@app/shared`

**Error Cases**:
- 400: Invalid page or pageSize parameters
- 500: Failed to fetch news

---

### Get Single Article

**GET** `/api/news/:id`

Returns a single news article by ID.

**Path Parameters**:
- `id` (string, required): Article ID

**Response** (200):
```json
{
  "id": "article-123",
  "title": "Breaking News Title",
  "summary": "Short summary of the article...",
  "content": "Full article content here...",
  "author": "John Doe",
  "publishedAt": "2026-02-08T12:00:00.000Z",
  "source": "Example News",
  "url": "https://example.com/article",
  "imageUrl": "https://example.com/image.jpg"
}
```

**TypeScript Type**: `NewsArticle` from `@app/shared`

**Error Cases**:
- 404: Article not found
- 500: Failed to fetch article

---

## Data Models

All data models are defined in `@app/shared` package:

### NewsArticle
```typescript
interface NewsArticle {
  id: string;              // Unique identifier
  title: string;           // Article title
  summary: string;         // Short summary
  content: string;         // Full content
  author?: string;         // Author name (optional)
  publishedAt: string;     // ISO 8601 timestamp
  source: string;          // Source name (e.g., "BBC News")
  url?: string;            // Original article URL (optional)
  imageUrl?: string;       // Cover image URL (optional)
}
```

### NewsListResponse
```typescript
interface NewsListResponse {
  articles: NewsArticle[];
  total: number;           // Total articles available
  page: number;            // Current page (1-indexed)
  pageSize: number;        // Items per page
}
```

### HealthResponse
```typescript
interface HealthResponse {
  status: 'ok';
  timestamp: string;       // ISO 8601 timestamp
}
```

### ErrorResponse
```typescript
interface ErrorResponse {
  error: {
    code: string;          // Error code (e.g., "NOT_FOUND")
    message: string;       // Human-readable message
    details?: any;         // Optional additional context
  };
}
```

---

## Implementation Notes

- All endpoints validate input parameters
- Pagination is 1-indexed (page=1 is the first page)
- Default cache TTL: 15 minutes
- Maximum pageSize: 50 articles
- Article IDs are generated from source URL + published date hash
