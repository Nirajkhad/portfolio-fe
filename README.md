# portfolio-fe

Personal portfolio frontend — built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

Live at [niraj.com.np](https://niraj.com.np)

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + shadcn/ui
- **Fonts** — Space Grotesk (sans) · Fira Code (mono)
- **Analytics** — Vercel Analytics

## Features

- Hero, Experience, Projects, Skills, Writing, Contact sections
- Dynamic blog post pages at `/blog/[slug]`
- Data fetched from a REST API (`portfolio-be`)
- Dark-only design with a terminal-inspired aesthetic

## Getting Started

```bash
# install dependencies
pnpm install

# copy env and set API URL
cp .env.example .env.local

# run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable              | Description                   | Default                        |
| --------------------- | ----------------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | Base URL of the portfolio API | `http://localhost:8080/api/v1` |

## Project Structure

```
app/
  page.tsx              # Home (all sections)
  blog/[slug]/page.tsx  # Blog post detail
components/
  hero.tsx
  experience.tsx
  projects.tsx
  skills.tsx
  writing.tsx
  contact.tsx
  navbar.tsx
  footer.tsx
  ui/                   # shadcn/ui primitives
lib/
  api.ts                # API client & TypeScript types
  portfolio-data.ts     # Static/fallback data
  utils.ts
```

## Related

- [portfolio-be](https://github.com/Nirajkhad/portfolio-be) — Laravel API backend
