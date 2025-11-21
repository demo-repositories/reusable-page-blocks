import {isObjectSchemaType, type InputProps, useTranslation, type ObjectInputProps} from 'sanity'
import {lazy, Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Box, Button, Card, Flex, Skeleton, Stack, Text} from '@sanity/ui'
import {RestoreIcon} from '@sanity/icons'

const ReusableBlockBanner = lazy(() =>
  import('./ReusableBlockBanner').then((m) => ({default: m.ReusableBlockBanner})),
)

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  const {t} = useTranslation('reusable-blocks')

  return (
    <Card border radius={2} padding={2} tone="critical">
      <Flex align="center" justify="space-between" gap={3}>
        <Box flex={1}>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              {t('error-fallback.title')}
            </Text>
            <Text size={1} muted>
              {error.message}
            </Text>
          </Stack>
        </Box>
        <Button
          icon={RestoreIcon}
          text={t('error-fallback.retry-button')}
          onClick={resetErrorBoundary}
          tone="critical"
          mode="ghost"
          fontSize={1}
        />
      </Flex>
    </Card>
  )
}

/**
 * Skeleton loader for the reusable block banner to prevent layout shift
 */
function ReusableBlockBannerSkeleton() {
  return (
    <Card border radius={2} padding={3} tone="primary">
      <Flex align="center" justify="space-between" gap={3}>
        <Box flex={1}>
          <Stack space={3}>
            <Skeleton animated radius={1} style={{width: '60%', height: '1em'}} />
            <Skeleton animated radius={1} style={{width: '80%', height: '1em'}} />
          </Stack>
        </Box>
        <Skeleton animated radius={2} style={{width: '120px', height: '32px'}} />
      </Flex>
    </Card>
  )
}

/**
 * Determines if the reusable block UI should be shown
 *
 * Conditions that must all be true:
 * 1. level >= 1: We're editing an array item, not a root document field
 *    (level 0 = document root, level 1+ = nested in arrays/objects)
 * 2. Not already a reusable block type (prevent infinite decoration)
 * 3. Schema type is an object (not primitive like string/number)
 * 4. Schema has `options.reusable = true` set
 *
 * Why check level: We only want to decorate objects inside arrays, not
 * standalone object fields at the document level.
 */
function shouldShowReusableBlockInput(props: InputProps): props is ObjectInputProps {
  const {schemaType, level} = props

  return (
    level >= 1 &&
    schemaType.name !== 'reusableBlock' &&
    isObjectSchemaType(schemaType) &&
    schemaType.options?.reusable === true
  )
}

/**
 * Global Input Decorator
 *
 * ORIGINAL PATTERN (field-based):
 * Added a `blockCopy` field to each schema that rendered a FieldProps component.
 * Required importing the field and adding it to every schema's fields array.
 *
 * REFACTORED PATTERN (input decoration):
 * Register one input component globally that checks for `options.reusable`
 * and conditionally decorates. No schema fields needed - just set an option.
 * Uses TypeScript declaration merging to make the option type-safe.
 *
 * Benefits: Less repetition, cleaner schemas, metadata stays in options not fields.
 *
 * React 19 Patterns:
 * - Lazy: Code-split the banner component, only loads when needed
 * - Suspense: Declarative loading states with skeleton fallback
 * - ErrorBoundary: Catch errors at component boundary, provide retry
 */
export function ReusableBlockInput(props: InputProps) {
  const shouldDecorate = shouldShowReusableBlockInput(props)

  if (shouldDecorate) {
    return (
      <Stack space={1}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<ReusableBlockBannerSkeleton />}>
            <ReusableBlockBanner {...props} />
          </Suspense>
        </ErrorBoundary>

        <Box>{props.renderDefault(props)}</Box>
      </Stack>
    )
  }

  return props.renderDefault(props)
}
