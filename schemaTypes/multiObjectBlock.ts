import {defineType} from 'sanity'
import {blockCopy} from './blockCopy'

export default defineType({
  name: 'multiObjectBlock',
  title: 'Multi Object Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'objects',
      title: 'Objects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
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
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'text',
                      title: 'Link Text',
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
            },
          ],
          preview: {
            select: {
              title: 'title',
              alt: 'alt',
              media: 'image',
            },
            prepare(selection) {
              return {
                title: selection.title || selection.alt || 'Untitled',
                subtitle: selection.alt ? `Alt: ${selection.alt}` : undefined,
                media: selection.media,
              }
            },
          },
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
    blockCopy,
  ],
  preview: {
    select: {
      title: 'title',
      objects: 'objects',
      backgroundColor: 'backgroundColor',
    },
    prepare(selection) {
      const count = selection.objects ? selection.objects.length : 0
      return {
        title: selection.title || 'Multi Object Block',
        subtitle: `${count} object${count !== 1 ? 's' : ''}${selection.backgroundColor ? ` • ${selection.backgroundColor}` : ''}`,
      }
    },
  },
})
