import {defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headline',
      media: 'backgroundImage',
    },
  },
})
