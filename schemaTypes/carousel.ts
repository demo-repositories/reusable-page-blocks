import {defineType} from 'sanity'

export default defineType({
  name: 'carousel',
  title: 'Reusable Carousel',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'title',
      title: 'Carousel Title',
      type: 'string',
    },
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'autoplaySpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      hidden: ({parent}) => !parent?.autoplay,
      initialValue: 5,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'slides.0.image',
    },
  },
})
