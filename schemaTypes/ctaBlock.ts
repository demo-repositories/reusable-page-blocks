import {defineType} from 'sanity'

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action Block',
  type: 'object',
  options: {
    reusable: true,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
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
          validation: (rule) => rule.required(),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) => rule.required(),
        },
      ],
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
          {title: 'Green', value: 'green'},
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: `CTA: ${selection.title}`,
      }
    },
  },
})
