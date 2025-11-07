import { defineField } from "sanity"
import { BlockCopy } from "../Components/BlockCopy"

export const blockCopy = defineField({
  name: "internalPageBlockCopy",
  type: "boolean",
  title: "Transform into a reusable page block",
  components: { field: BlockCopy },
  description:
    "Is this a commonly used page block? Turn it into a reusable page block",
})
