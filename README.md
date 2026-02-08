# News Web MVP

A full-stack news website built with Next.js (frontend) and Node.js/Express (backend) in a TypeScript monorepo.

## Architecture

- **Frontend**: Next.js 16 (App Router, TypeScript)
- **Backend**: Express.js (TypeScript)
- **Shared**: Type definitions in `@app/shared`

See `/docs/architecture.md` for detailed architecture decisions.

## Project Structure

```
/
├── apps/
│   ├── web/          # Next.js frontend (port 3000)
│   └── api/          # Express backend (port 3001)
├── packages/
│   └── shared/       # Shared TypeScript types
├── docs/             # Architecture, API contract, tasks
└── package.json      # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd equipoAplicacion
```

2. Install all dependencies:
```bash
npm install
```

3. Set up environment variables:

**Backend** (`apps/api/.env`):
```bash
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env if needed
```

**Frontend** (`apps/web/.env.local`):
```bash
# Create apps/web/.env.local with:
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Running the Application

#### Development Mode (Both Apps)

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- Backend API at `http://localhost:3001`
- Frontend at `http://localhost:3000`

#### Individual Apps

**Backend only:**
```bash
npm run dev -w apps/api
```

**Frontend only:**
```bash
npm run dev -w apps/web
```

### Building for Production

Build all workspaces:

```bash
npm run build
```

Run backend in production:
```bash
npm run start -w apps/api
```

Run frontend in production:
```bash
npm run start -w apps/web
```

## Available Scripts

From the root directory:

- `npm run dev` - Run both apps in development mode
- `npm run build` - Build all workspaces
- `npm run lint` - Lint all workspaces
- `npm run test` - Run tests (if any)

## API Documentation

See `/docs/api-contract.md` for complete API documentation.

**Quick Reference:**
- `GET /health` - Health check
- `GET /api/news` - List news articles (with pagination)
- `GET /api/news/:id` - Get single article

## Development Workflow

1. Check `/docs/tasks.md` for task breakdown
2. Make changes following TypeScript strict mode
3. Run `npm run lint` to check code quality
4. Run `npm run build` to verify builds pass
5. Test manually by running both apps

## Contributing

1. All code must be in English (variables, functions, comments)
2. Use TypeScript strict mode (no `any` without justification)
3. Follow existing code style
4. Update documentation if you change behavior
5. Ensure `npm run lint` and `npm run build` pass before committing

## Documentation

- `/docs/architecture.md` - Architecture decisions
- `/docs/api-contract.md` - API endpoint specifications
- `/docs/tasks.md` - Task breakdown and checklist

## License

ISC

