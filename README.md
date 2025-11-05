# Reusable Page Blocks

A Sanity Studio demonstration showcasing a flexible page builder system with reusable content blocks.

## What This Demonstrates

This project shows how to build a modular content management system using Sanity Studio with:

- **Page Builder**: Compose pages using drag-and-drop content blocks
- **Reusable Blocks**: Create reusable content components (Hero, Video, Carousel) that can be referenced across multiple pages
- **Content Types**: Pre-built block types including text, images, CTAs, and feature grids
- **Document Components**: Structured content types for heroes, videos, and carousels

## Installation

1. Install dependencies using pnpm:

```bash
pnpm install
```

2. Copy the `.env.example` file to `.env` and add your Sanity project credentials:

```bash
cp .env.example .env
```

Then update the values in `.env` with your Sanity project ID and dataset.

## Running the Studio

Start the development server:

```bash
pnpm run dev
```

The Sanity Studio will be available at `http://localhost:3333`

## Other Commands

- `pnpm run build` - Build the studio for production
- `pnpm run deploy` - Deploy the studio to Sanity's hosting
