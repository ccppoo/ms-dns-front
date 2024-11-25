import { z } from "zod"

const domainSearchParams = z.object({
  subdomain: z.optional(z.string()),
})

type DomainSearchParams = z.infer<typeof domainSearchParams>

export { domainSearchParams }
export type { DomainSearchParams }
