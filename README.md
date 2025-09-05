# Project Setup

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Requirements

- [pnpm](https://pnpm.io/) (package manager)
- Node.js (LTS recommended)
- Your own environment variables (`.env.local` file)

## Getting Started

Clone the repository and install dependencies:

```bash
pnpm i
```

Create a `.env.local` file in the project root and provide the required environment keys. (Ask the project maintainer for the list of keys if needed.)

Run the development server:

```bash
pnpm dev
```

Also, start the WebSocket server from the project root:

```bash
pnpm tsx ws/server.ts
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Notes

- You must use **pnpm** (not npm, yarn, or bun).
- The app will not run without the proper environment variables.
- The WebSocket server must be running for full functionality.
- Edit the main page at `app/page.tsx` — it will auto-update as you save changes.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is with the [Vercel Platform](https://vercel.com/new).  
See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
