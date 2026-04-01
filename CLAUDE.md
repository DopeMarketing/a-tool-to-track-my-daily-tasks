# CLAUDE.md - A Tool To Track My Daily Tasks

This is your briefing file for working on this task management project. Read this first, every time.

## Project Overview

A streamlined task management tool built for a marketing business owner who needs to track client deliverables without complex project management overhead. The tool emphasizes quick capture, intelligent organization by client/revenue impact, and seamless Gmail integration to prevent tasks from falling through the cracks.

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **Supabase** for database and real-time features
- **External APIs:** Gmail, Asana, ClickUp, Slack

## Folder Structure


├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard layout group
│   ├── api/               # API routes only
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Business logic and utilities
│   ├── utils.ts          # General utilities
│   ├── validations.ts    # Zod schemas
│   └── constants.ts      # App constants
├── db/                   # Database layer ONLY
│   ├── queries/          # Database queries
│   ├── types.ts          # Database types
│   └── supabase.ts       # Supabase client
├── actions/              # Server actions ONLY
├── integrations/         # External API integrations
│   ├── gmail/
│   ├── asana/
│   ├── clickup/
│   └── slack/
├── types/                # TypeScript type definitions
└── supabase/            # Database schema and migrations


## Coding Conventions

- **TypeScript strict mode** — no `any` types
- **Server Components by default** — use Client Components only when needed
- **Data access ONLY in `/db`** — all database queries go here
- **Business logic ONLY in `/lib` and `/actions`**
- **No secrets in client components** — environment variables with `NEXT_PUBLIC_` only
- **Server actions in `/actions`** — for form submissions and mutations
- **Tailwind for all styling** — no custom CSS unless absolutely necessary

## Current State - What's Built

This is a fresh scaffold with:
- ✅ Next.js 15 project structure
- ✅ Supabase configuration
- ✅ Database schema (8 tables)
- ✅ Route stubs for all pages
- ✅ Integration stubs (Gmail, Asana, ClickUp, Slack)
- ✅ Basic TypeScript setup
- ❌ No actual functionality yet

## Data Model (8 tables)

1. **users** — user profiles
2. **clients** — client information and revenue data
3. **projects** — client projects and campaigns
4. **task_templates** — recurring task templates
5. **tasks** — individual tasks with priorities and due dates
6. **api_integrations** — external integration configurations
7. **external_task_mappings** — sync mappings for Asana/ClickUp
8. **task_comments** — task notes and updates

## What to Build Next - v1 Features

1. **Quick task entry** with client/project tagging and priority levels (High/Medium/Low)
2. **Daily dashboard view** with tasks grouped by client and sorted by priority and due date
3. **Recurring task templates** with customizable frequency (daily, weekly, monthly) for common client deliverables
4. **Two-way Gmail integration** to create tasks from emails and send task updates to clients

## Never Touch Rules

- ❌ **Never modify `.env` files** without explicit instruction
- ❌ **Never modify migration files** without explicit instruction
- ❌ **Never change RLS policies** without security review
- ❌ **Never add auth** — this is a personal tool with no authentication

## How to Work on This Project

1. **Always read this file first** before making changes
2. **Run `npm run build`** before committing to catch TypeScript errors
3. **Commit small and often** with conventional commit messages
4. **Document technical debt explicitly** in TECHNICAL_DEBT.md
5. **Test integrations carefully** — external APIs can break things
6. **Prioritize user experience** — this tool must be fast and intuitive

## Key Business Rules

- **Revenue-based prioritization** — $50K clients get priority over smaller accounts
- **Client grouping** — batch communication by client for efficiency
- **Quick capture** — task entry must be under 10 seconds
- **Smart defaults** — minimize required fields, maximize automation

## Integration Priority

1. **Gmail** (critical) — most client communication happens here
2. **Slack** (important) — team notifications and daily digests
3. **Asana/ClickUp** (insurance) — team uses these for operations

Remember: This tool is built for someone who's great at selling but terrible at detailed tracking. Make it dead simple.