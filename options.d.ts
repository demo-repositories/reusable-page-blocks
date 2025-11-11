/**
 * TypeScript declaration merging to extend Sanity's `ObjectOptions`
 * with a custom `reusable` option.
 *
 * This allows marking object schema types as reusable page blocks
 * by adding `options: { reusable: true }` to their definitions.
 */
declare module 'sanity' {
  export interface ObjectOptions {
    /**
     * Marks this object type as a reusable page block.
     * When true, the `BlockCopy` component will be available to transform
     * instances of this block into reusable document references.
     */
    reusable?: boolean
  }
}

// This export is required for TypeScript to treat this file as a module
export {}
