# Tasks Breakdown

## Backend Tasks (apps/api)

### Core API
- [x] Initialize Express app with TypeScript
- [x] Set up `/health` endpoint returning `HealthResponse`
- [x] Implement `GET /api/news` endpoint (list with pagination)
- [x] Implement `GET /api/news/:id` endpoint (single article)
- [x] Add input validation middleware
- [x] Add error handling middleware
- [x] Configure CORS properly

### News Ingestion
- [x] Create `sources/` directory for pluggable news sources
- [x] Implement RSS/Atom parser utility
- [x] Create example source module (e.g., `sources/example-rss.ts`)
- [x] Implement in-memory cache with TTL (15 min)
- [x] Add cache refresh logic
- [x] Generate article IDs from source + timestamp

### Data & Utilities
- [x] Create NewsService class for business logic
- [x] Implement pagination logic
- [x] Add logging utility (non-sensitive)
- [x] Create `.env.example` with all required variables

### Testing & Quality
- [x] Run `npm run lint` and fix issues
- [x] Run `npm run build` and verify success
- [x] Manual test: health endpoint
- [x] Manual test: list news endpoint
- [x] Manual test: single article endpoint
- [x] Verify error responses match contract

---

## Frontend Tasks (apps/web)

### Pages & Routing
- [x] Create `/app/page.tsx` (home/list page)
- [x] Create `/app/news/[id]/page.tsx` (detail page)
- [x] Add metadata (title, description) to pages
- [x] Implement loading states (`loading.tsx`)
- [x] Implement error states (`error.tsx`)

### Components
- [x] Create `NewsCard` component for list view
- [x] Create `NewsDetail` component for detail view
- [x] Create `Pagination` component
- [x] Add basic CSS modules for styling

### Data Fetching
- [x] Create API client utility (`lib/api.ts`)
- [x] Implement fetch for news list with pagination
- [x] Implement fetch for single article
- [x] Handle error cases (network, 404, 500)
- [x] Handle empty state (no articles)

### Configuration
- [x] Add API base URL to environment variables
- [x] Create `.env.local.example`
- [x] Update `next.config.js` if needed

### Testing & Quality
- [x] Run `npm run lint` and fix issues
- [x] Run `npm run build` and verify success
- [x] Manual test: list page renders
- [x] Manual test: pagination works
- [x] Manual test: detail page renders
- [x] Manual test: error states work
- [x] Manual test: loading states work

---

## Documentation Tasks

- [x] Create `/docs/architecture.md`
- [x] Create `/docs/api-contract.md`
- [x] Create `/docs/tasks.md`
- [ ] Update root README with run instructions
- [ ] Add screenshots or examples

---

## Root/Workspace Tasks

- [x] Set up npm workspaces
- [x] Create root `package.json` with scripts
- [x] Create `tsconfig.base.json`
- [ ] Install all dependencies (`npm install` at root)
- [ ] Test `npm run dev` (both apps)
- [ ] Test `npm run build` (all workspaces)
- [ ] Test `npm run lint` (all workspaces)
- [ ] Create `.gitignore` (node_modules, dist, .env, etc.)

---

## Shared Package Tasks

- [x] Create `@app/shared` package
- [x] Define `HealthResponse` type
- [x] Define `NewsArticle` type
- [x] Define `NewsListResponse` type
- [x] Define `ErrorResponse` type
- [ ] Add more types as needed

---

## Definition of Done (Entire MVP)

- [ ] All backend endpoints implemented and tested
- [ ] All frontend pages implemented and tested
- [ ] `npm run dev` starts both apps successfully
- [ ] `npm run build` passes for all workspaces
- [ ] `npm run lint` passes for all workspaces
- [ ] README contains clear run instructions
- [ ] No secrets committed (only `.env.example` files)
- [ ] All types match `/docs/api-contract.md`
- [ ] Manual E2E flow works: visit list → click article → see detail
