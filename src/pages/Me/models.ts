import { z } from 'zod';

const userProfile = z.object({
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});

type UserProfile = z.infer<typeof userProfile>;

const userDomain = z.object({
  name: z.string(),
  values: z.array(z.string()),
  recordType: z.string(),

  dnsProvider: z.string(),
  domain: z.string(),
  TTL: z.number().gte(0),
  createdAt: z.date(),
  updated_at: z.date(),
});

const userDomains = z.object({
  domain: z.array(userDomain).default([]),
});

type UserDomain = z.infer<typeof userDomain>;

type UserDomains = z.infer<typeof userDomains>;

export type { UserProfile, UserDomain, UserDomains };
