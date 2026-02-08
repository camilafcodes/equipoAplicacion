# News API Backend

Backend API for the News Web MVP application.

## Technology Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Runtime**: Node.js 20+
- **Data Source**: RSS/Atom feeds with in-memory caching
- **Cache TTL**: 15 minutes

## Project Structure

```
src/
├── index.ts                  # Main application entry point
├── middleware/
│   ├── errorHandler.ts      # Error handling middleware
│   └── validation.ts        # Input validation middleware
├── routes/
│   └── news.ts              # News API routes
├── services/
│   └── NewsService.ts       # Business logic for news operations
├── sources/
│   ├── rss-sources.ts       # RSS feed fetchers (BBC, TechCrunch)
│   └── mock-data.ts         # Mock data for testing/development
└── utils/
    └── cache.ts             # In-memory cache utility with TTL
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3001                     # Server port
NODE_ENV=development          # Environment (development/production)
USE_MOCK_DATA=true           # Use mock data instead of RSS feeds
```

## Installation

From the repository root:

```bash
npm install
```

## Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```bash
GET /health
```

**Response** (200):
```json
{
  "status": "ok",
  "timestamp": "2026-02-08T18:00:00.000Z"
}
```

### List News Articles
```bash
GET /api/news?page=1&pageSize=10
```

**Query Parameters**:
- `page` (optional, default: 1): Page number (1-indexed)
- `pageSize` (optional, default: 10, max: 50): Items per page

**Response** (200):
```json
{
  "articles": [...],
  "total": 42,
  "page": 1,
  "pageSize": 10
}
```

### Get Single Article
```bash
GET /api/news/:id
```

**Response** (200):
```json
{
  "id": "article-123",
  "title": "Article Title",
  "summary": "Short summary...",
  "content": "Full content...",
  "author": "John Doe",
  "publishedAt": "2026-02-08T12:00:00.000Z",
  "source": "Source Name",
  "url": "https://...",
  "imageUrl": "https://..."
}
```

**Error Response** (404):
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Article not found"
  }
}
```

## Testing

### Manual Testing

1. Start the server:
```bash
npm run dev
```

2. Test health endpoint:
```bash
curl http://localhost:3001/health
```

3. Test news list:
```bash
curl "http://localhost:3001/api/news?page=1&pageSize=5"
```

4. Test single article:
```bash
curl "http://localhost:3001/api/news/mock-article-1"
```

5. Test validation errors:
```bash
# Page size too large
curl "http://localhost:3001/api/news?pageSize=100"

# Non-existent article
curl "http://localhost:3001/api/news/invalid-id"
```

## Code Quality

### Linting
```bash
npm run lint
```

### Building
```bash
npm run build
```

## Data Sources

### RSS Feeds
The application supports fetching news from RSS/Atom feeds. Currently configured sources:
- BBC News: `http://feeds.bbci.co.uk/news/rss.xml`
- TechCrunch: `https://techcrunch.com/feed/`

To use real RSS feeds, set `USE_MOCK_DATA=false` in your `.env` file.

### Mock Data
For development and testing, mock data is available. Set `USE_MOCK_DATA=true` to use it.

### Adding New Sources
To add a new RSS source:

1. Add a new fetch function in `src/sources/rss-sources.ts`:
```typescript
export async function fetchNewSource(): Promise<NewsArticle[]> {
  const feed = await parser.parseURL('https://example.com/rss');
  // ... parse and return articles
}
```

2. Update `NewsService.ts` to include the new source:
```typescript
const [bbcArticles, techCrunchArticles, newArticles] = await Promise.all([
  fetchBBCNews(),
  fetchTechCrunch(),
  fetchNewSource(),
]);
```

## Caching Strategy

- Articles are cached in memory for 15 minutes (configurable via `CACHE_TTL`)
- Cache is automatically refreshed when expired
- No persistent storage (for MVP)

## Error Handling

All errors follow a consistent format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

Common error codes:
- `VALIDATION_ERROR` (400): Invalid input parameters
- `NOT_FOUND` (404): Resource not found
- `INTERNAL_ERROR` (500): Server error

## CORS Configuration

CORS is enabled for all origins in development. For production, configure allowed origins in `src/index.ts`.
