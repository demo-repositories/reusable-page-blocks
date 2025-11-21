import {type LocaleResourceBundle} from 'sanity'

/**
 * The locale namespace for the reusable page blocks feature
 */
export const reusableBlocksLocaleNamespace = 'reusable-blocks' as const

/**
 * The default locale bundle for reusable page blocks (US English)
 */
export const reusableBlocksUsEnglishLocaleBundle: LocaleResourceBundle = {
  locale: 'en-US',
  namespace: reusableBlocksLocaleNamespace,
  resources: () => import('./resources'),
}

export type {ReusableBlocksLocaleResourceKeys} from './resources'
