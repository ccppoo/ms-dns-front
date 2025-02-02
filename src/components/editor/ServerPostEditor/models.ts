import { z } from 'zod';

import { _outputDataSchema, boardPostMetadata, boardPostTitle } from '../models';
import { postBase } from '../models/base';

const minecraftVersion = z.array(z.string()).default([]);
const minecraftLauncher = z.array(z.string()).default([]);

export const minecraftInfo = z.object({
  version: minecraftVersion,
  launcher: minecraftLauncher,
});

export const serverInfo = z.object({
  tags: z.array(z.string()).default([]),
  server_logo: z.optional(z.string()),
  service24hr: z.boolean().default(true),
  service_term: z.string(),
  server_address: z.string(),
  // serviceTime: z.array(z.number().gte(0).lte(24)),
});

export type ServerInfo = z.infer<typeof serverInfo>;

const serverCommunity = z
  .array(
    z.object({
      name: z.string(),
      service: z.string(),
      url: z.string().url(),
    }),
  )
  .default([]);

const serverPostSchema = postBase
  .merge(_outputDataSchema)
  .merge(boardPostTitle)
  .merge(boardPostMetadata)
  .extend({ minecraft_info: minecraftInfo })
  .extend({ server_info: serverInfo })
  .extend({ server_community: serverCommunity });

const serverPostSchemaRead = serverPostSchema.required({
  id: true,
  data: true,
  creator: true,
  title: true,
  server_info: true,
  server_community: true,
  minecraft_info: true,
  created_at: true,
});

export type ServerPostSchema = z.input<typeof serverPostSchema>;
export type ServerPostSchemaRead = z.infer<typeof serverPostSchemaRead>;

const DEFAULT_INITIAL_DATA = {
  blocks: [
    {
      type: 'header',
      data: {
        text: 'New note title...',
        level: 1,
      },
    },
  ],
};

export const serverPostSchemaDefault: ServerPostSchema = {
  id: undefined,
  creator: undefined,
  data: DEFAULT_INITIAL_DATA,
  created_at: undefined,
  updated_at: undefined,
  title: '',
  minecraft_info: {
    launcher: [],
    version: [],
  },
  server_info: {
    service24hr: true,
    service_term: 'long',
    server_logo: undefined,
    server_address: '',
    tags: [],
  },
  server_community: [],
};
