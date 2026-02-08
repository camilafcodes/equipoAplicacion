# News Web MVP - Frontend

Next.js-based frontend for the News Web MVP application.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules
- **Data Fetching**: Server Components with fetch API
- **SEO**: Built-in Next.js metadata API

## Features

- 📰 News article list with pagination
- 📖 Individual article detail pages
- 🎨 Responsive design with light/dark mode
- ⚡ Server-side rendering for better SEO
- 🔄 Loading states with skeleton UI
- ❌ Error handling and empty states
- 🖼️ Optimized images with Next.js Image component

## Getting Started

### Prerequisites

- Node.js 20+
- Backend API running at `http://localhost:3001` (default)

### Installation

1. Install dependencies from the root of the monorepo:

```bash
cd ../..
npm install
```

### Configuration

Create a `.env.local` file (copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Configure the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Running the Development Server

From the root:

```bash
npm run dev -w apps/web
```

Or from this directory:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/list page
│   ├── news/[id]/         # Article detail page
│   ├── loading.tsx        # Loading state
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── NewsCard.tsx       # Article card for list view
│   ├── NewsDetail.tsx     # Article detail view
│   └── Pagination.tsx     # Pagination component
└── lib/                   # Utilities
    └── api.ts             # API client
```

## API Integration

The frontend consumes the backend API defined in `/docs/api-contract.md`:

- `GET /api/news` - List news articles (with pagination)
- `GET /api/news/:id` - Get single article
- `GET /health` - Health check

All types are defined in the `@app/shared` package.

## Development

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript is checked automatically during build. For standalone type checking:

```bash
npx tsc --noEmit
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [API Contract](/docs/api-contract.md)
- [Architecture](/docs/architecture.md)

