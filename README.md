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

### Block Copy Component

The `BlockCopy` component (`/components/BlockCopy.tsx`) provides a "Make Reusable" button within the Studio that allows editors to:

1. **Transform regular blocks into reusable blocks** - Click the button to convert any page block into a standalone reusable block document
2. **Automatic replacement** - The original block is replaced with a reference to the new reusable block
3. **Preserve references** - Uses Sanity's `_key` tracking to ensure seamless updates without breaking the document structure
4. **Error handling** - Provides user feedback via toast notifications for success and error states

This pattern is useful when you want to:
- Create reusable content from existing blocks
- Maintain consistency across multiple pages
- Update content in one place and see changes everywhere it's referenced

### How It Works

When a user clicks "Make Reusable":

1. The component extracts the current block's data and title
2. Creates a new `reusablePageBlock` document in Sanity
3. Replaces the original block with a reference (preserving the `_key`)
4. Updates the parent document with the new content array
5. Shows a success notification

The key to making this work is preserving the original `_key` when creating the reference - this allows Sanity to track which block is being replaced without throwing errors.

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
  └── BlockCopy.tsx          # Custom component for transforming blocks
/schemaTypes
  ├── reusablePageBlock.ts   # Schema for reusable block documents
  └── ...                    # Other schema definitions
/utils                       # Utility functions and helpers
sanity.config.ts             # Sanity Studio configuration
```

## Other Commands

- `pnpm run build` - Build the studio for production
- `pnpm run deploy` - Deploy the studio to Sanity's hosting

## Extending This Demo

To add the BlockCopy component to your own fields:

1. Import the component in your schema:
   ```typescript
   import { BlockCopy } from '../components/BlockCopy'
   ```

2. Add it to your field's `components` definition:
   ```typescript
   {
     name: 'content',
     type: 'array',
     of: [/* your block types */],
     components: {
       item: BlockCopy
     }
   }
   ```

3. Ensure you have a `reusablePageBlock` schema defined in your project
