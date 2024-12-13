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

const userSubdomainRecord = z.object({
  recordType: z.string(),
  name: z.string(),
  values: z.array(z.string()),
});

const userSubdomainInfo = z.object({
  name: z.string(),
  note: z.string(),
  domain: z.string(),
  subdomain: z.string(),
  records: z.array(userSubdomainRecord),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const userSubdomains = z.object({
  subdomains: z.array(userSubdomainInfo),
});

type UserDomain = z.infer<typeof userDomain>;

type UserDomains = z.infer<typeof userDomains>;
type UserSubdomainRecord = z.infer<typeof userSubdomainRecord>;
type UserSubdomainInfo = z.infer<typeof userSubdomainInfo>;
type UserSubdomains = z.infer<typeof userSubdomains>;

export type {
  UserProfile,
  UserDomain,
  UserDomains,
  UserSubdomains,
  UserSubdomainInfo,
  UserSubdomainRecord,
};
