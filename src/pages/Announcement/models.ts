import { z } from 'zod';

const announcementListing = z.object({
  id: z.string(),
  title: z.string(),
  creator: z.string(),
});

const userProfile = z.object({
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});

export type UserProfile = z.infer<typeof userProfile>;

export type AnnouncementListing = z.infer<typeof announcementListing>;
