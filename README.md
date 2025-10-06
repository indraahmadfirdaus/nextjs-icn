# Task Board

A simple task management application built with Next.js featuring authentication, task CRUD, status filtering, compact dashboard statistics, and AI-powered task suggestions.

## Table of Contents
- Project Overview
- Features
- Tech Stack
- Directory Structure
- Getting Started
- Environment Variables
- Development
- API Summary
- Deployment

## Project Overview
This project is a Next.js App Router application that helps users manage daily tasks. It includes login and registration, a dashboard to view and filter tasks, create and edit modals, a custom delete confirmation modal, and an AI suggestions modal to generate task ideas.

The UI is styled with Tailwind CSS and uses Lucide icons. Client-side state is managed with Zustand. HTTP requests are handled through an Axios client with an interceptor that attaches the auth token stored in localStorage.

## Features
- User authentication: register, login, and profile retrieval
- Task CRUD: create, update status, edit, and delete
- Status filtering: all, todo, in_progress, done
- Dashboard statistics: compact cards showing counts and completion rate
- AI suggestions: generate task ideas from context and add them quickly
- Responsive, clean UI with modals for task creation, editing, and deletion

## Tech Stack
- Next.js (App Router)
- Tailwind CSS
- Zustand (state management)
- Axios (HTTP client)
- Lucide React (icons)
- date-fns (date utilities)

## Directory Structure
```
src/
  app/
    page.js           # Redirect based on auth
    layout.js         # Root layout and global styles
    login/page.js     # Login page
    register/page.js  # Registration page
    dashboard/page.js # Main dashboard
  components/
    DashboardHeader.js
    TaskStats.js
    TaskList.js
    TaskCard.js
    CreateTaskModal.js
    EditTaskModal.js
    ConfirmDeleteModal.js
    AISuggestionModal.js
  lib/
    api.js            # Axios client and API helpers
  store/
    authStore.js      # Auth state (token, user)
    taskStore.js      # Tasks state
```

## Getting Started
Prerequisites:
- Node.js 18+ and npm

Install dependencies and start the dev server:
```bash
npm install
npm run dev
```
Open the app in your browser. By default Next.js uses `http://localhost:3000`. If a different port is shown in the terminal, use that address.

## Environment Variables
The API client reads the base URL from `NEXT_PUBLIC_API_URL`.

Example `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

If this variable is not set, the client defaults to `http://localhost:3001`.

## Development
- Global styles live in `src/app/globals.css` and Tailwind config in `tailwind.config.js`.
- The Axios client (`src/lib/api.js`) automatically attaches the auth token from localStorage to requests.
- State is persisted in localStorage via Zustand.

## API Summary
The frontend expects a backend exposing these endpoints:

- Auth
  - `POST /auth/register` — create an account
  - `POST /auth/login` — obtain `accessToken` and user
  - `GET /auth/me` — fetch current user profile

- Tasks
  - `GET /tasks` — list tasks
  - `GET /tasks/:id` — get a task
  - `POST /tasks` — create a task
  - `PATCH /tasks/:id` — update a task
  - `DELETE /tasks/:id` — delete a task

- AI
  - `POST /ai/suggestions` — generate task suggestions from `{ context }`

## Deployment
You can deploy to any platform that supports Next.js. For Vercel, follow the official Next.js deployment guide:
https://nextjs.org/docs/app/building-your-application/deploying
