import { z } from 'zod';

const userProfile = z.object({
  nickname: z.string(),
  profileImage: z.string(),
  uid: z.string(),
  createdAt: z.string(),
  // code: z.string(),
  // scope: z.string(),
  // authuser: z.string(),
  // prompt: z.string(),
});

export type UserProfile = z.infer<typeof userProfile>;
