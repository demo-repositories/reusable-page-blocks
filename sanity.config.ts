import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'reusable-page-blocks',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure,
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
