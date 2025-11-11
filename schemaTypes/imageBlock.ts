import {defineType} from 'sanity'
import {blockCopy} from './blockCopy'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    blockCopy,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: `Image: ${selection.title}`,
        media: selection.media,
      }
    },
  },
})
