type PostTopic = 'announcement' | 'server';
type PostID = number | string;

type PaginationOptions = {
  page?: number;
  order?: string;
  limit?: number;
};

export type { PostTopic, PostID, PaginationOptions };
