/**
 * Reusable Page Block Schema
 *
 * This schema defines a document type that wraps object blocks (textBlock, imageBlock, etc.)
 * to make them reusable across multiple pages.
 *
 * HOW IT WORKS:
 * 1. Object blocks (textBlock, imageBlock, etc.) can be added directly to pages
 * 2. When you click "Make Reusable" on a block, the BlockCopy component:
 *    - Creates a new reusablePageBlock document containing that block
 *    - Replaces the inline block with a reference to this document
 * 3. The same reusablePageBlock can now be referenced on multiple pages
 * 4. Editing the reusablePageBlock updates it everywhere it's used
 *
 * EXAMPLE:
 * Page A has an inline textBlock → Click "Make Reusable" →
 * Creates reusablePageBlock document → Page A now references it →
 * Page B can also reference the same reusablePageBlock
 */

import {BiSolidExtension} from 'react-icons/bi'
import {type SanityClient, defineType, useClient} from 'sanity'
import useSWR from 'swr'
import {PageBlockPreview} from '../components/PageBlockPreview'
import {pluralize} from '../utils/pluralize'
import {sortByType} from '../utils/sortByType'

export default defineType({
  name: 'reusablePageBlock',
  type: 'document', // This is a document type, not an object, so it can be referenced
  fields: [
    {
      // Internal name used in the Studio to identify this reusable block
      name: 'title',
      type: 'string',
      description: 'Name only used in the studio to identify this reusable page block',
      validation: (rule) => rule.required(),
    },
    {
      // The actual content - an array that holds exactly ONE block
      // Why an array? Sanity requires arrays to hold different types
      // Why min(1).max(1)? We only want to store one block per reusable document
      name: 'content',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(1),
      of: [
        // List of all block types that can be made reusable
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'ctaBlock'},
        {type: 'featuresGrid'},
        {type: 'multiObjectBlock'},
      ]
        .sort(sortByType) // Sort alphabetically by type name for better UX
        .map((block) => ({
          ...block,
          // Use custom preview component for each block
          components: {preview: PageBlockPreview},
        })),
    },
  ],
  // Default preview configuration for document lists
  preview: {
    select: {
      title: 'title', // Show the title field
      _type: 'content.0._type', // Get the type of the first (and only) content item
    },
    prepare({title, _type}: {title?: string; _type?: string}) {
      // Format the block type name for display
      // e.g., "textBlock" → "text Block" → "Text Block"
      const type = _type
        ?.replace('PageBlock', '')
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^(\w)/, (match) => match.toUpperCase()) // Capitalize first letter

      // Build subtitle showing what type of block this is
      let subtitle = 'Reusable Page Block (empty)'
      if (type) subtitle = `Reusable ${type}`

      return {
        media: BiSolidExtension, // Icon shown in lists
        title: `${title}`,
        subtitle,
      }
    },
  },
  // Custom preview component that shows usage count
  components: {
    preview: function Preview(props) {
      const id = (props as any)?._id
      const client = useClient()
      // Fetch count of pages that reference this block
      const count = useReferences(client, id)?.length
      let subtitle = props.subtitle

      // Append usage count to subtitle
      // e.g., "Reusable Text Block (used in 3 pages)"
      if (typeof count === 'number') {
        const noun = pluralize(count, 'page', 'pages')
        subtitle += ` (used in ${count} ${noun})`
      }

      return props.renderDefault({...props, subtitle})
    },
  },
})

/**
 * Custom hook to fetch all documents that reference a given document ID
 *
 * @param client - Sanity client instance
 * @param _id - Document ID to find references to
 * @returns Array of documents that reference this ID
 */
function useReferences(client: SanityClient, _id?: string) {
  // Remove "drafts." prefix if present (Sanity adds this to unpublished docs)
  _id = _id?.replace('drafts.', '')

  // Use SWR for caching and automatic revalidation
  const {data} = useSWR<any[]>(_id, (id) => {
    if (!id) return []
    // GROQ query: Find all documents that reference this ID
    return client.fetch('*[references($id)]', {id})
  })

  return data
}
