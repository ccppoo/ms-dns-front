import { z } from 'zod';

export const documentBase = z.object({
  id: z.optional(z.string()), // 데칼 글 작성 자체 DocumnetID
});

export const postBase = z.object({
  _id: z.optional(z.string()),
});
