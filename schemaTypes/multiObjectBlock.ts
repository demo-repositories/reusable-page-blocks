import {defineType} from 'sanity'

export default defineType({
  name: 'multiObjectBlock',
  title: 'Multi Object Block',
  type: 'object',
  fields: [
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
              type: 'string'
            },
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
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3
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
                      type: 'string'
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'url'
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              alt: 'alt',
              media: 'image'
            },
            prepare(selection) {
              return {
                title: selection.title || selection.alt || 'Untitled',
                subtitle: selection.alt ? `Alt: ${selection.alt}` : undefined,
                media: selection.media
              }
            }
          }
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
      objects: 'objects',
      backgroundColor: 'backgroundColor'
    },
    prepare(selection) {
      const count = selection.objects ? selection.objects.length : 0
      return {
        title: 'Multi Object Block',
        subtitle: `${count} object${count !== 1 ? 's' : ''}${selection.backgroundColor ? ` • ${selection.backgroundColor}` : ''}`
      }
    }
  }
})