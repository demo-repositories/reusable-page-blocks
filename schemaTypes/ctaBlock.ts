import {defineType} from 'sanity'

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action Block',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3
    },
    {
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Gray', value: 'gray'},
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'}
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare(selection) {
      return {
        title: `CTA: ${selection.title}`
      }
    }
  }
})