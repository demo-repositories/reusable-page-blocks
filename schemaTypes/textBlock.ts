import {defineType} from 'sanity'
import { blockCopy } from './blockCopy'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}]
    },
    blockCopy,
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: `Text: ${selection.title || 'No title'}`
      }
    }
  }
})