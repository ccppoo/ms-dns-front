import { z } from 'zod';

const announcementListing = z.object({
  id: z.string(),
  title: z.string(),
  creator: z.string(),
  created_at: z.string(),
});

type AnnouncementListing = z.infer<typeof announcementListing>;

export type { AnnouncementListing };
