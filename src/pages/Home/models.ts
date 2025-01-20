import { z } from 'zod';

import { minecraftInfo, serverInfo } from '@/components/editor/ServerPostEditor/models';

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

const serverProfileListing = z.object({
  id: z.string(),
  title: z.string(),
  creator: z.string(),
  server_info: serverInfo,
  minecraft_info: minecraftInfo,
});
export type ServerProfileListing = z.infer<typeof serverProfileListing>;
