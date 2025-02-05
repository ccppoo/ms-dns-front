import { z } from 'zod';

const subdomainEditResponse = z.object({
  msg: z.string(),
});

type SubdomainEditResponse = z.infer<typeof subdomainEditResponse>;

export type { SubdomainEditResponse };
