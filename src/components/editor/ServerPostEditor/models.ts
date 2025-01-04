import { z } from 'zod';

import { _outputDataSchema, boardPostMetadata, boardPostTitle } from '../models';
import { postBase } from '../models/base';

const serverPostSchema = postBase
  .merge(_outputDataSchema)
  .merge(boardPostTitle)
  .merge(boardPostMetadata);

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
  // comments: 0,
  data: DEFAULT_INITIAL_DATA,
  uploaded_at: undefined,
  modified_at: undefined,
  // vote: undefined,
  // user_id: undefined,
  title: '',
};
