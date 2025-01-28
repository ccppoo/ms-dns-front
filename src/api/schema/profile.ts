import { z } from 'zod';

const userProfile = z.object({
  nickname: z.string(),
  profileImage: z.string(),
  createdAt: z.date(),
  uid: z.string(),
  role: z.string(),
});

const userProfileExpire = userProfile.extend({
  expires: z.date(),
});

type UserProfile = z.infer<typeof userProfile>;
type UserProfileExpire = z.infer<typeof userProfileExpire>;

export type { UserProfile, UserProfileExpire };
