import { z } from 'zod';

import { _outputDataSchema, boardPostMetadata, boardPostTitle } from '../models';
import { postBase } from '../models/base';

const minecraftVersion = z.array(z.string()).default([]);
const minecraftLauncher = z.array(z.string()).default([]);

const minecraftInfo = z.object({
  version: minecraftVersion,
  launcher: minecraftLauncher,
});

const serverInfo = z.object({
  tags: z.array(z.string()).default([]),
  service24hr: z.boolean().default(true),
  serviceTerm: z.string(),
  // serviceTime: z.array(z.number().gte(0).lte(24)),
});

const serverContact = z.object({
  discord: z.optional(z.string()),
  kakaoTalk: z.optional(z.string()),
  naverCafe: z.optional(z.string()),
  websites: z.array(z.string()).default([]),
});

const serverPostSchema = postBase
  .merge(_outputDataSchema)
  .merge(boardPostTitle)
  .merge(boardPostMetadata)
  .extend({ minecraftInfo: minecraftInfo })
  .extend({ serverInfo: serverInfo })
  .extend({ serverContact: serverContact });

export type ServerPostSchema = z.input<typeof serverPostSchema>;

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
  data: DEFAULT_INITIAL_DATA,
  uploaded_at: undefined,
  modified_at: undefined,
  title: '',
  minecraftInfo: {
    launcher: [],
    version: [],
  },
  serverInfo: {
    service24hr: true,
    serviceTerm: 'long',
    tags: [],
  },
  serverContact: {
    discord: undefined,
    kakaoTalk: undefined,
    naverCafe: undefined,
    websites: [],
  },
};
