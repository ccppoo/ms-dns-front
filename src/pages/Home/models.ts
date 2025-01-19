import { z } from 'zod';

const domainCurrentUsage = z.object({
  status: z.string(),
});

type DomainCurrentUsage = z.infer<typeof domainCurrentUsage>;

const availableDomains = z.object({
  domains: z.array(z.string()),
});

type AvailableDomains = z.infer<typeof availableDomains>;

const registerDomain = z.object({
  domain: z.string(),
  // host: z.string(),
  subdomain: z.string(),
  // port: z.number().gte(3000).lte(65565),
  ip: z.string(),
});

type RegisterDomainInput = z.input<typeof registerDomain>;
type RegisterDomain = z.infer<typeof registerDomain>;

// const registerDomain

export type { RegisterDomain, RegisterDomainInput };

export type { DomainCurrentUsage, AvailableDomains };
