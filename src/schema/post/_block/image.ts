import { z } from 'zod';

import { blockSchemaBase } from './base';

const imageBlockData = z.object({
  caption: z.string({ description: 'plain string' }).default(''),
  withBorder: z.boolean().default(false),
  withBackground: z.boolean().default(false),
  stretched: z.boolean().default(false),
  file: z.object({
    url: z.string().url(),
  }),
});

export const imageBlockSchema = blockSchemaBase.merge(z.object({ data: imageBlockData }));

export type ImageBlockSchemaType = z.infer<typeof imageBlockSchema>;
