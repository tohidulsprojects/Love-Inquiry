# Love Inquiry

## Overview

A playful, romantic single-page web application that presents users with a "Do you love me?" question. The app features an interactive experience where the "No" button runs away from the cursor, making it impossible to click, while clicking "Yes" triggers a celebration with confetti. The application uses a React frontend with an Express backend, styled with a romantic pink color palette.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom romantic pink/red color palette
- **Animations**: Framer Motion for button escape animations
- **Effects**: canvas-confetti for celebration effects on "Yes" click

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **Module System**: ES Modules (type: "module" in package.json)
- **Storage**: In-memory storage (MemStorage class) - no database connection required at runtime

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components (shadcn/ui)
    pages/        # Page components (Home, not-found)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # In-memory data storage
shared/           # Shared code between client and server
  schema.ts       # Drizzle schema definitions (interactions table)
  routes.ts       # API route type definitions
```

### API Design
- Single POST endpoint: `/api/interactions` - Records when a user clicks "Yes"
- Uses Zod for request validation
- Type-safe API definitions shared between frontend and backend

### Build System
- Development: tsx runs server directly with Vite middleware for HMR
- Production: Custom build script using esbuild for server bundle, Vite for client
- Output: `dist/` directory with `index.cjs` (server) and `public/` (client assets)

## External Dependencies

### Core Libraries
- **drizzle-orm/drizzle-kit**: Database ORM and migrations (schema defined but using in-memory storage)
- **@tanstack/react-query**: Async state management
- **framer-motion**: Animation library for interactive button behavior
- **canvas-confetti**: Confetti celebration effects

### UI Framework
- **Radix UI**: Extensive set of accessible UI primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-built component library using Radix + Tailwind
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling for server code
- **PostCSS/Autoprefixer**: CSS processing

### Database (Schema Only)
- PostgreSQL schema defined via Drizzle (`shared/schema.ts`)
- Currently uses in-memory storage (`server/storage.ts`)
- DATABASE_URL environment variable support exists but is optional for basic operation