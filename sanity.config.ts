import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {IoExtensionPuzzle} from 'react-icons/io5'

export default defineConfig({
  name: 'default',
  title: 'reusable-page-blocks',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  // mediaLibrary: {
  //   enabled: true,
  // },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Page')
              .schemaType('page')
              .child(S.documentTypeList('page').title('Pages')),
            S.divider(),
            S.listItem()
              .title('Reusable Page Blocks')
              .icon(IoExtensionPuzzle)
              .child(
                S.documentTypeList('reusablePageBlock')
                  .title('Reusable Page Blocks')
              ),
            S.divider(),
            S.listItem()
              .title('Document Components')
              .child(
                S.list()
                  .title('Document Components')
                  .items([
                    S.listItem()
                      .title('Hero Section')
                      .schemaType('hero')
                      .child(S.documentTypeList('hero').title('Hero Sections')),
                    S.listItem()
                      .title('Video')
                      .schemaType('video')
                      .child(S.documentTypeList('video').title('Videos')),
                    S.listItem()
                      .title('Carousel')
                      .schemaType('carousel')
                      .child(S.documentTypeList('carousel').title('Carousels')),
                  ])
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
  beta: {
    form: {
      enhancedObjectDialog: {
        enabled: true,
      },
    },
  },
})
