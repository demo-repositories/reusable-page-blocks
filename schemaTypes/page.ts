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
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'ctaBlock'},
        {type: 'featuresGrid'},
        {type: 'multiObjectBlock'},
        // this references the reusable page block document type
        {
          type: 'reference',
          to: [{type: 'reusablePageBlock'}],
          title: 'Reusable Page Block',
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