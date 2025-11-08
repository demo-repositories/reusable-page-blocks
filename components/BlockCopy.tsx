// Converts PortableText blocks to plain text strings
import {toPlainText} from '@portabletext/toolkit'
// Icon for the transform button
import {TransferIcon} from '@sanity/icons'
// UI components from Sanity's design system
import {Card, Box, Flex, Button, Text, useToast} from '@sanity/ui'
import {useMemo, useState} from 'react'
import {
  type PortableTextBlock,
  type FieldProps, // Props passed to custom field components
  type ObjectItem, // Base type for array items in Sanity
  useClient, // Hook to access Sanity API client
  useFormValue, // Hook to read form values from the current document
} from 'sanity'
import reusablePageBlock from '../schemaTypes/reusablePageBlock'

// Get the schema name for reusable blocks
const REUSABLE_BLOCK_TYPE = reusablePageBlock.name

// Extends ObjectItem to include an optional title field (can be string or PortableText)
interface BlockItem extends ObjectItem {
  title?: string | PortableTextBlock
}

/**
 * BlockCopy Component
 *
 * Provides a UI to transform a regular page block into a reusable block.
 * When clicked, it creates a new reusable block document and replaces
 * the current block with a reference to it.
 */
export function BlockCopy(field: FieldProps) {
  // Track loading state while the transformation is in progress
  const [loading, setLoading] = useState(false)
  // Sanity client for making API calls to create/update documents
  const client = useClient()
  // Toast notifications for user feedback
  const toast = useToast()

  // Extract the unique _key identifier from the field path
  // This identifies which block in the content array we're working with
  const {_key} = field.path[1] as {_key: string}

  // Get current document ID (so we can update it later)
  const currentId = useFormValue(['_id']) as string | undefined

  // Get current document type (to check if we're already in a reusable block)
  const currentType = useFormValue(['_type']) as string | undefined

  // Get all blocks from the content array
  const allBlocks = useFormValue(['content']) as BlockItem[]

  // Find the index of the current block in the array
  // useMemo prevents recalculation on every render
  const thisBlockIndex = useMemo(
    () => allBlocks.findIndex((block) => block._key === _key),
    [allBlocks, _key],
  )

  // If we're already editing a reusable block, show an info message
  // instead of the transform button (can't make a reusable block reusable)
  if (currentType === REUSABLE_BLOCK_TYPE)
    return (
      <Card padding={3} radius={2} shadow={1} tone="primary">
        <Text size={1} muted weight="bold">
          You are editing a Reusable Page Block.
        </Text>
      </Card>
    )

  /**
   * Handles the transformation of a regular block into a reusable block
   * Steps:
   * 1. Extract block data and title
   * 2. Create a new reusable block document in Sanity
   * 3. Replace the current block with a reference to the new document
   * 4. Update the parent document with the new content array
   */
  const handleTransform = async () => {
    // Get the data for the block we want to transform
    const blockData = allBlocks[thisBlockIndex]

    // Extract the title - could be a plain string or PortableText array
    const blockTitle =
      typeof blockData?.title === 'string'
        ? blockData?.title
        : toPlainText(blockData?.title as unknown as PortableTextBlock[])

    try {
      // Show loading state to user
      setLoading(true)

      // Step 1: Create a new reusable block document in Sanity
      // This copies the block data into a new document that can be referenced
      const res = await client.create({
        _type: REUSABLE_BLOCK_TYPE,
        title: blockTitle,
        content: [{...blockData}],
      })

      // Step 2: Create a reference object to replace the original block
      // IMPORTANT: We preserve the original _key to maintain Sanity's tracking
      // If we generate a new _key, Sanity won't know which block to replace
      const reference = {
        _type: 'reference',
        _ref: res._id, // Points to the newly created reusable block
        _key: _key, // Preserve the original _key so Sanity can track the replacement
      }

      // Step 3: Map through all blocks and replace the target block with the reference
      const newBlocks = allBlocks.map((block, index) => {
        if (index === thisBlockIndex) return reference
        return block
      })

      // Step 4: Update the parent document with the new content array
      client.patch(currentId).set({content: newBlocks}).commit()

      // Show success notification to user
      toast.push({
        status: 'success',
        title: 'Block transformed',
        description: 'Block has been transformed to a reusable block',
      })
    } catch (err) {
      // Show error notification if anything goes wrong
      toast.push({
        status: 'error',
        title: 'Block could not be transformed',
        description: err.message,
      })
    } finally {
      // Always reset loading state when done
      setLoading(false)
    }
  }

  // Render the UI component
  // Shows field title/description on the left and "Make Reusable" button on the right
  return (
    <Card padding={3} radius={1} shadow={1} tone="primary">
      <Flex gap={4} paddingRight={2} align="center" justify="space-between">
        {/* Left side: Field title and description */}
        <Box>
          <Flex gap={2} align="center" wrap="wrap">
            {field.title && (
              <Text size={1} weight="bold">
                {field.title}
              </Text>
            )}
          </Flex>

          {field.description && (
            <Text size={1} muted style={{marginTop: '0.5rem'}}>
              {field.description}
            </Text>
          )}
        </Box>

        {/* Right side: Transform button */}
        <Button
          icon={TransferIcon}
          onClick={handleTransform}
          text="Make Reusable"
          padding={3}
          loading={loading} // Shows spinner while transformation is in progress
        />
      </Flex>
    </Card>
  )
}
