import { Box, Flex, Badge } from "@sanity/ui"
import { PreviewProps } from "sanity"

interface Props extends PreviewProps {
  _key: string
  theme?: string
}

export function PageBlockPreview(props: Props) {
  return (
    <Flex gap={3} paddingRight={2} align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      {props.theme && <Badge mode="outline">{props.theme}</Badge>}
    </Flex>
  )
}
