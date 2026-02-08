# Architecture

## Overview
This is a News Web MVP with a TypeScript-based monorepo architecture using npm workspaces.

## Stack

### Frontend
- **Framework**: Next.js 16.x (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules (no heavy component libraries)
- **Data fetching**: Server Components + fetch API
- **SEO**: Built-in Next.js metadata API

### Backend
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js 20+
- **Data storage**: In-memory cache (for MVP)
- **News sources**: RSS/Atom feeds (pluggable architecture)

### Shared
- **Package**: `@app/shared`
- **Purpose**: Type definitions (DTOs, interfaces) shared between FE and BE
- **Location**: `/packages/shared`

## Monorepo Structure

```
/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express backend
├── packages/
│   └── shared/       # Shared TypeScript types
├── docs/             # Architecture, API contract, tasks
├── package.json      # Root workspace config
└── tsconfig.base.json # Base TypeScript config
```

## Data Flow

1. **News Ingestion** (Backend):
   - Backend fetches news from RSS/Atom feeds
   - Parses and normalizes data into `NewsArticle` interface
   - Stores in in-memory cache with TTL
   - Refresh strategy: on-demand (when cache expires)

2. **Frontend → Backend**:
   - Frontend calls REST API endpoints
   - Backend returns JSON responses matching `@app/shared` types
   - Error responses follow consistent error shape

3. **Caching**:
   - Backend: In-memory cache for news articles (TTL: 15 minutes)
   - Frontend: Next.js default caching behavior
   - No database or persistent storage for MVP

## News Sources Strategy

For MVP, we use RSS/Atom feeds:
- No web scraping (against many sites' TOS)
- Pluggable source architecture in `apps/api/src/sources/`
- Each source module exports a function that returns `NewsArticle[]`
- Add new sources by creating new modules

**Decision needed**: 
- Which specific RSS feeds to use? (e.g., BBC News, TechCrunch, etc.)
- Update frequency? (default: 15 min cache TTL)

## Deployment Considerations

**Decision needed**:
- Hosting target: Vercel (FE) + Node.js hosting (BE)?
- Database: None for MVP, but may need for user features later
- Authentication: Not implemented in MVP
- Analytics: Not implemented in MVP

## Quality Gates

Before merging:
- `npm run lint` passes (root)
- `npm run build` passes (root)
- All types match `/docs/api-contract.md`
- README updated with run instructions

## Security Notes

- No secrets in code
- `.env.example` files provided, real `.env` in `.gitignore`
- Input validation on all API endpoints
- CORS configured for frontend origin only (in production)
