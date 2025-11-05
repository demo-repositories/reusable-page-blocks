import {defineType} from 'sanity'

export default defineType({
  name: 'featuresGrid',
  title: 'Features Grid',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
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
    }
  ],
  preview: {
    select: {
      title: 'heading',
      features: 'features'
    },
    prepare(selection) {
      const count = selection.features ? selection.features.length : 0
      return {
        title: `Features: ${selection.title || 'No heading'}`,
        subtitle: `${count} feature${count !== 1 ? 's' : ''}`
      }
    }
  }
})