import { z } from "zod"

const serverIconUpload = z.object({
  image: z.optional(z.string()),
})

export type ServerIconUpload = z.infer<typeof serverIconUpload>
