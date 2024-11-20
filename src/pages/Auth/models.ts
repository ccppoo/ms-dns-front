import { z } from "zod"

const googleSSOCallback = z.object({
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
})

type GoogleSSOCallback = z.infer<typeof googleSSOCallback>

export type { GoogleSSOCallback }
