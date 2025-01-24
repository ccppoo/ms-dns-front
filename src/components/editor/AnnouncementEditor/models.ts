import { z } from 'zod';

import { _outputDataSchema, boardPostMetadata, boardPostTitle } from '../models';
import { postBase } from '../models/base';

const announcementPostSchema = postBase
  .merge(_outputDataSchema)
  .merge(boardPostTitle)
  .merge(boardPostMetadata);

export type AnnouncementPostSchema = z.input<typeof announcementPostSchema>;
export type AnnouncementPostSchemaRead = z.infer<typeof announcementPostSchema>;

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

export const announcementPostSchemaDefault: AnnouncementPostSchema = {
  _id: undefined,
  data: DEFAULT_INITIAL_DATA,
  uploaded_at: undefined,
  updated_at: undefined,
  title: '',
};
