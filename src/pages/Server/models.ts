import { z } from 'zod';

import { minecraftInfo, serverInfo } from '@/components/editor/ServerPostEditor/models';

const serverProfileListing = z.object({
  id: z.string(),
  title: z.string(),
  creator: z.string(),
  server_info: serverInfo,
  minecraft_info: minecraftInfo,
});

const userProfile = z.object({
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});

export type UserProfile = z.infer<typeof userProfile>;

export type ServerProfileListing = z.infer<typeof serverProfileListing>;
