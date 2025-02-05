import { z } from 'zod';

const userProfile = z.object({
  nickname: z.string(),
  profileImage: z.string(),
  uid: z.string(),
  createdAt: z.string(),
});

const userProfileAuthExpire = userProfile.extend({
  expires: z.date(),
  role: z.string(),
});

type UserProfile = z.infer<typeof userProfile>;
type UserProfileAuthExpire = z.infer<typeof userProfileAuthExpire>;

export type { UserProfile, UserProfileAuthExpire };
