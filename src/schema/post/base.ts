import { z } from 'zod';

export const documentBase = z.object({
  id: z.optional(z.string()), // 데칼 글 작성 자체 DocumnetID
});

export const postBase = z.object({
  id: z.optional(z.string()), // postID
  creator: z.optional(z.string()), // creator uid
});
