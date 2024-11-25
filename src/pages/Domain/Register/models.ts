import { z } from "zod"

const registerDomain = z.object({
  domain: z.string(),
})

type RegisterDomain = z.infer<typeof registerDomain>

export type { RegisterDomain }
