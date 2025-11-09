import {defineLocalesResources} from 'sanity'

/**
 * Translation strings for reusable page blocks feature
 * English (US) locale
 */
const reusableBlocksLocaleStrings = defineLocalesResources('reusable-blocks', {
  /** Banner title */
  'banner.title': 'Transform into a reusable page block',

  /** Banner description */
  'banner.description': 'Is this a commonly used page block? Turn it into a reusable page block',

  /** Banner button text */
  'banner.button': 'Make Reusable',

  /** Success toast title */
  'toast.success-title': 'Block transformed',

  /** Success toast description */
  'toast.success-description': 'Block has been transformed to a reusable block',

  /** Error toast title */
  'toast.error-title': 'Block could not be transformed',

  /** Error when document ID is missing */
  'error.no-document-id': 'No document ID found',

  /** Error fallback title */
  'error-fallback.title': 'Failed to make block reusable',

  /** Error fallback retry button */
  'error-fallback.retry-button': 'Try Again',
})

export type ReusableBlocksLocaleResourceKeys = keyof typeof reusableBlocksLocaleStrings
export default reusableBlocksLocaleStrings
