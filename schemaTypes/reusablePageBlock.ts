import {defineType} from 'sanity'
import {IoExtensionPuzzle} from 'react-icons/io5'

// This reusable page block is used to create reusable page blocks that can be used in multiple pages
// it references other documents to create the reusable page block so it can be reused.
export default defineType({
  name: 'reusablePageBlock',
  title: 'Reusable Page Block',
  type: 'document',
  icon: IoExtensionPuzzle,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name only used in the studio to identify this reusable page block',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'reference',
      to: [
        {type: 'hero'},
        {type: 'video'},
        {type: 'carousel'}
      ],
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      contentType: 'content._type',
      contentName: 'content.name'
    },
    prepare(selection) {
      const {title, contentType, contentName} = selection
      return {
        title,
        subtitle: contentType ? `Resuable Block: ${contentName || 'Untitled'}` : 'No content selected'
      }
    }
  }
})
