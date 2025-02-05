import { z } from 'zod';

import { minecraftInfo, serverInfo } from './post';

const serverProfileListing = z.object({
  id: z.string(),
  title: z.string(),
  creator: z.string(),
  server_info: serverInfo,
  minecraft_info: minecraftInfo,
});

export type ServerProfileListing = z.infer<typeof serverProfileListing>;
