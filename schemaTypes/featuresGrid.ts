import {defineType} from 'sanity'
import { blockCopy } from './blockCopy'

export default defineType({
  name: 'featuresGrid',
  title: 'Features Grid',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'image'
            }
          ]
        }
      ]
    },
    blockCopy,
  ],
  preview: {
    select: {
      title: 'title',
      features: 'features'
    },
    prepare(selection) {
      const count = selection.features ? selection.features.length : 0
      return {
        title: `Features: ${selection.title || 'No title'}`,
        subtitle: `${count} feature${count !== 1 ? 's' : ''}`
      }
    }
  }
})