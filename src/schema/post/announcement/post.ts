import { z } from 'zod';

import { postBase } from '../base';
import { _outputDataSchema, boardPostMetadata, boardPostTitle } from '../index';

const announcementPostSchema = postBase
  .merge(_outputDataSchema)
  .merge(boardPostTitle)
  .merge(boardPostMetadata);

const announcementPostSchemaRead = announcementPostSchema.merge(
  z.object({
    created_at: z.optional(z.string()), // 작성일
    updated_at: z.optional(z.string()), // 수정일
  }),
);
type AnnouncementPostSchema = z.input<typeof announcementPostSchema>;
type AnnouncementPostSchemaRead = z.infer<typeof announcementPostSchemaRead>;

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

const announcementPostSchemaDefault: AnnouncementPostSchema = {
  id: undefined,
  data: DEFAULT_INITIAL_DATA,
  created_at: undefined,
  updated_at: undefined,
  title: '',
};

export type { AnnouncementPostSchema, AnnouncementPostSchemaRead };
export { announcementPostSchemaDefault };
