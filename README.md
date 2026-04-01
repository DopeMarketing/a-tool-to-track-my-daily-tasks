# A Tool To Track My Daily Tasks

A streamlined task management tool designed for marketing business owners who need to stay on top of client deliverables without getting buried in operational details.

## What this does

This tool helps marketing professionals capture, organize, and track client-focused tasks with automatic prioritization and intelligent grouping. Built for fast-moving businesses where every client relationship matters and nothing can fall through the cracks.

**Built for:** Marketing business owners juggling 75+ team members and multiple client relationships
**Core strength:** Quick task capture with smart organization by client and revenue impact

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Supabase
- **Database:** PostgreSQL (via Supabase)
- **Integrations:** Asana API, ClickUp API, Gmail API, Slack API
- **Deployment:** Vercel
- **Authentication:** Supabase Auth (disabled for personal use)

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase CLI
- Git

## Local Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd task-tracker
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   bash
   cp .env.example .env.local
   # Edit .env.local with your values
   

4. **Start Supabase**
   bash
   npx supabase start
   

5. **Run the development server**
   bash
   npm run dev
   

6. **Open in browser**
   
   http://localhost:3000
   

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key for server operations | Yes |
| `GMAIL_CLIENT_ID` | Gmail API client ID | Yes |
| `GMAIL_CLIENT_SECRET` | Gmail API client secret | Yes |
| `ASANA_ACCESS_TOKEN` | Asana personal access token | No |
| `CLICKUP_API_TOKEN` | ClickUp API token | No |
| `SLACK_BOT_TOKEN` | Slack bot token for notifications | No |
| `NEXTAUTH_SECRET` | Secret for session encryption | Yes |
| `NEXTAUTH_URL` | Application URL for OAuth callbacks | Yes |

## Database Setup

1. **Initialize Supabase**
   bash
   npx supabase init
   

2. **Run migrations**
   bash
   npx supabase db push
   

3. **Seed the database** (optional)
   bash
   npm run db:seed
   

## Deploy to Vercel

1. **Connect to Vercel**
   bash
   npx vercel
   

2. **Add environment variables** in Vercel dashboard

3. **Deploy**
   bash
   npx vercel --prod
   

## Project Structure


├── app/                  # Next.js 15 app directory
│   ├── api/             # API routes
│   ├── tasks/           # Task management pages
│   ├── clients/         # Client management pages
│   └── projects/        # Project pages
├── components/          # React components
├── lib/                 # Business logic and utilities
├── db/                  # Database queries and types
├── actions/             # Server actions
├── integrations/        # External API integrations
├── supabase/           # Database migrations and config
└── types/              # TypeScript type definitions


## Key Features (v1)

- ⚡ Quick task entry with client/project tagging
- 📊 Daily dashboard grouped by client and priority
- 🔄 Recurring task templates
- 📧 Two-way Gmail integration
- 💰 Revenue-based task prioritization

## Contributing

This is a personal project, but feedback and suggestions are welcome via issues.

## License

Private use only.