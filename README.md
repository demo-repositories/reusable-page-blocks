# Reusable Page Blocks

A Sanity Studio demonstration showcasing a flexible page builder system with reusable content blocks and one-click block transformation.

## What This Demonstrates

This project shows how to build a modular content management system using Sanity Studio with:

- **Page Builder**: Compose pages using drag-and-drop content blocks
- **Reusable Blocks**: Create reusable content components (Hero, Video, Carousel) that can be referenced across multiple pages
- **Block Transformation**: Convert any existing page block into a reusable block with a single click
- **Content Types**: Pre-built block types including text, images, CTAs, and feature grids
- **Document Components**: Structured content types for heroes, videos, and carousels
- **Custom Components**: Custom React components for enhanced editing experience

## Key Features

### Reusable Block Transformation

This project uses an **input decoration** pattern to provide a "Make Reusable" banner within the Studio. This allows editors to:

1. **Transform regular blocks into reusable blocks** - Click the button to convert any page block into a standalone reusable block document
2. **Automatic replacement** - The original block is replaced with a reference to the new reusable block
3. **Preserve references** - Uses Sanity's `_key` tracking to ensure seamless updates without breaking the document structure
4. **Error handling** - Provides user feedback via toast notifications for success and error states

This pattern is useful when you want to:

- Create reusable content from existing blocks
- Maintain consistency across multiple pages
- Update content in one place and see changes everywhere it's referenced

### How It Works

**Input Decoration Pattern:**

Instead of adding fields to your schema, this project uses a global input component that automatically decorates any object type marked with `options: { reusable: true }`.

1. **Schema Configuration** - Add `options: { reusable: true }` to any object schema type (see `schemaTypes/ctaBlock.ts` as an example)
2. **Global Registration** - The `ReusableBlockInput` component is registered globally in `sanity.config.ts` as a form input component
3. **Automatic Detection** - The component checks each input to see if it has `options.reusable === true` and conditionally shows the transformation banner
4. **TypeScript Support** - Uses declaration merging (`options.d.ts`) to make the `reusable` option type-safe

**When a user clicks "Make Reusable":**

1. The component creates a new `reusablePageBlock` document in Sanity
2. Replaces the original block with a reference (preserving the `_key` for real-time safety)
3. Updates the parent document through the form system
4. Opens the newly created reusable block for editing
5. Shows a success notification

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

## Project Structure

```
/components
  ├── ReusableBlockInput.tsx   # Global input decorator that enables reusable blocks
  └── ReusableBlockBanner.tsx  # UI component for transforming blocks
/i18n
  ├── index.ts                 # i18n configuration (best practice for Studio UI text)
  └── resources.ts             # Translation strings for the reusable block UI
/schemaTypes
  ├── reusablePageBlock.ts     # Schema for reusable block documents
  └── ...                      # Other schema definitions
options.d.ts                   # TypeScript declaration merging for reusable option
sanity.config.ts               # Sanity Studio configuration
```

## Other Commands

- `pnpm run build` - Build the studio for production
- `pnpm run deploy` - Deploy the studio to Sanity's hosting

## Extending This Demo

To make your own block types reusable, simply add the `reusable` option to your schema:

```typescript
import {defineType} from 'sanity'

export default defineType({
  name: 'myBlock',
  title: 'My Block',
  type: 'object',
  options: {
    reusable: true, // This enables the "Make Reusable" banner
  },
  fields: [
    // your fields here
  ],
})
```

That's it! The `ReusableBlockInput` component is already registered globally in `sanity.config.ts`, so any object type with `options.reusable === true` will automatically show the transformation banner.

**Requirements:**

1. The global input component must be registered in `sanity.config.ts`
2. You must have a `reusablePageBlock` schema defined in your project
3. The TypeScript declaration file (`options.d.ts`) should be present for type safety

**Note on i18n:**

The i18n setup (`/i18n` folder and bundle registration in `sanity.config.ts`) is **best practice** for managing Studio UI text, especially if you plan to support multiple languages or share this feature as a plugin. However, it's not strictly required - you could hardcode the strings directly in the component if preferred. The i18n approach keeps all UI text centralized and makes future translations straightforward.
