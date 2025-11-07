import {defineType} from 'sanity'
import {IoExtensionPuzzle} from 'react-icons/io5'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'ctaBlock'},
        {type: 'featuresGrid'},
        {type: 'multiObjectBlock'},
        // Document references (reusable by nature)
        {
          type: 'reference',
          to: [{type: 'hero'}, {type: 'video'}, {type: 'carousel'}, {type: 'reusablePageBlock'}],
          icon: IoExtensionPuzzle
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare(selection) {
      const {title, slug} = selection
      return {
        title,
        subtitle: slug?.current ? `/${slug.current}` : 'No slug'
      }
    }
  }
})