import { z } from 'zod';

import { minecraftInfo, serverInfo } from '@/components/editor/ServerPostEditor/models';

const serverProfileListing = z.object({
  id: z.string(),
  title: z.string(),
  creator: z.string(),
  server_info: serverInfo,
  minecraft_info: minecraftInfo,
});

export type ServerProfileListing = z.infer<typeof serverProfileListing>;
