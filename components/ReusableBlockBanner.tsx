import {TransferIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Stack, Text, useToast} from '@sanity/ui'
import {startTransition, useActionState, useCallback, type FormEvent} from 'react'
import {
  DEFAULT_STUDIO_CLIENT_OPTIONS,
  type Id,
  isKeyedObject,
  type ObjectInputProps,
  PatchEvent,
  type Reference,
  set,
  useClient,
  useFormValue,
  useTemplates,
  useTranslation,
} from 'sanity'
import {usePaneRouter} from 'sanity/structure'
import {uuid} from '@sanity/uuid'

/**
 * Reusable Block Transformation Banner
 *
 * ORIGINAL ASYNC PATTERN:
 * - useState(loading) for manual loading state
 * - async function with try/catch/finally and setLoading() calls
 * - Sequential API calls: create document, get ID, then patch parent
 *
 * REFACTORED REACT 19.2 PATTERNS:
 * - useActionState: Automatic pending state, no manual useState
 * - Form semantics: <form> with type="submit" for accessibility
 * - Atomic transaction: Single transaction for create + patch (prevents orphans)
 * - JSONMatch syntax: Use _key instead of indices for real-time safety
 *
 * Why JSONMatch (_key-based):
 * Array indices are unreliable in real-time editing. Using _key ensures the
 * correct item is replaced even if array order changes during collaboration.
 */
export function ReusableBlockBanner(props: ObjectInputProps) {
  const client = useClient(DEFAULT_STUDIO_CLIENT_OPTIONS)
  const toast = useToast()
  const {t} = useTranslation('reusable-blocks')
  const templates = useTemplates()
  const {handleEditReference} = usePaneRouter()

  const currentBlock = props.value
  const currentId = useFormValue(['_id']) as Id | undefined

  /**
   * React 19 `useActionState` hook for handling the transformation
   * Automatically manages pending state and errors
   * @link https://react.dev/reference/react/useActionState
   *
   * Alternatively, could use `useTransition` for more granular control
   *
   * Async action that transforms a block into a reusable block
   * Steps:
   * 1. Create a new reusable block document in Sanity
   * 2. Replace the current block with a reference to the new document
   * 3. Update the parent document with the new content array
   */
  const [, transformAction, isPending] = useActionState(async () => {
    try {
      if (!currentId) {
        throw new Error(t('error.no-document-id'))
      }

      if (!(currentBlock && isKeyedObject(currentBlock))) {
        throw new Error('Block not found')
      }

      const newReusableBlockId = uuid()
      const {_key} = currentBlock

      // Step 1: Create the reusable block document
      await client.create(
        {
          _id: newReusableBlockId,
          _type: 'reusablePageBlock',
          title: 'New Reusable Block',
          content: [currentBlock],
        },
        {
          tag: 'transform-to-reusable-block',
        },
      )

      // Step 2: Replace array item via onChange (form system handles collaboration)
      const reference: Reference = {_type: 'reference', _ref: newReusableBlockId, _key}
      props.onChange(PatchEvent.from(set(reference)))

      /**
       * Handle successful transformation
       * Closes modal, sets focus, and shows success notification
       */
      const template = templates.find((t) => t.schemaType === 'reusablePageBlock')
      handleEditReference({
        id: newReusableBlockId,
        type: 'reusablePageBlock',
        parentRefPath: props.path,
        template: template ? {id: template.id} : {id: ''},
      })

      toast.push({
        status: 'success',
        title: t('toast.success-title'),
        description: t('toast.success-description'),
      })
    } catch (err) {
      /**
       * Handle transformation error
       * Logs error and shows error notification
       */
      console.error(err)

      toast.push({
        status: 'error',
        title: t('toast.error-title'),
        description: (err as Error).message,
      })

      throw err
    }
  }, null)

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      startTransition(transformAction)
    },
    [transformAction],
  )

  return (
    <Card as="form" border radius={2} padding={3} tone="primary" onSubmit={handleSubmit}>
      <Flex align="center" justify="space-between" gap={3}>
        <Box flex={1}>
          <Stack space={3}>
            <Text size={1} weight="semibold">
              {t('banner.title')}
            </Text>
            <Text size={1} muted>
              {t('banner.description')}
            </Text>
          </Stack>
        </Box>
        <Button
          type="submit"
          icon={TransferIcon}
          text={t('banner.button')}
          mode="ghost"
          disabled={isPending}
          loading={isPending}
        />
      </Flex>
    </Card>
  )
}
