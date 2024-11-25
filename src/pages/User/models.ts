import { z } from 'zod';

const userProfile = z.object({
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});

type UserProfile = z.infer<typeof userProfile>;

export type { UserProfile };
