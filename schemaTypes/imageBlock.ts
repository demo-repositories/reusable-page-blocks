import {defineType} from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image'
    },
    prepare(selection) {
      return {
        title: `Image: ${selection.title}`,
        media: selection.media
      }
    }
  }
})