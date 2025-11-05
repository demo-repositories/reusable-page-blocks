import {defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}]
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare(selection) {
      return {
        title: `Text: ${selection.title || 'No heading'}`
      }
    }
  }
})