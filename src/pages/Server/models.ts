import { z } from 'zod';

const serverProfileListing = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  creator: z.string(),
});

const userProfile = z.object({
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});

export type UserProfile = z.infer<typeof userProfile>;

export type ServerProfileListing = z.infer<typeof serverProfileListing>;
