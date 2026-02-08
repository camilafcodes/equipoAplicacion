# Tasks Breakdown

## Backend Tasks (apps/api)

### Core API
- [x] Initialize Express app with TypeScript
- [x] Set up `/health` endpoint returning `HealthResponse`
- [ ] Implement `GET /api/news` endpoint (list with pagination)
- [ ] Implement `GET /api/news/:id` endpoint (single article)
- [ ] Add input validation middleware
- [ ] Add error handling middleware
- [ ] Configure CORS properly

### News Ingestion
- [ ] Create `sources/` directory for pluggable news sources
- [ ] Implement RSS/Atom parser utility
- [ ] Create example source module (e.g., `sources/example-rss.ts`)
- [ ] Implement in-memory cache with TTL (15 min)
- [ ] Add cache refresh logic
- [ ] Generate article IDs from source + timestamp

### Data & Utilities
- [ ] Create NewsService class for business logic
- [ ] Implement pagination logic
- [ ] Add logging utility (non-sensitive)
- [ ] Create `.env.example` with all required variables

### Testing & Quality
- [ ] Run `npm run lint` and fix issues
- [ ] Run `npm run build` and verify success
- [ ] Manual test: health endpoint
- [ ] Manual test: list news endpoint
- [ ] Manual test: single article endpoint
- [ ] Verify error responses match contract

---

## Frontend Tasks (apps/web)

### Pages & Routing
- [ ] Create `/app/page.tsx` (home/list page)
- [ ] Create `/app/news/[id]/page.tsx` (detail page)
- [ ] Add metadata (title, description) to pages
- [ ] Implement loading states (`loading.tsx`)
- [ ] Implement error states (`error.tsx`)

### Components
- [ ] Create `NewsCard` component for list view
- [ ] Create `NewsDetail` component for detail view
- [ ] Create `Pagination` component
- [ ] Add basic CSS modules for styling

### Data Fetching
- [ ] Create API client utility (`lib/api.ts`)
- [ ] Implement fetch for news list with pagination
- [ ] Implement fetch for single article
- [ ] Handle error cases (network, 404, 500)
- [ ] Handle empty state (no articles)

### Configuration
- [ ] Add API base URL to environment variables
- [ ] Create `.env.local.example`
- [ ] Update `next.config.js` if needed

### Testing & Quality
- [ ] Run `npm run lint` and fix issues
- [ ] Run `npm run build` and verify success
- [ ] Manual test: list page renders
- [ ] Manual test: pagination works
- [ ] Manual test: detail page renders
- [ ] Manual test: error states work
- [ ] Manual test: loading states work

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
