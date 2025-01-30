type QueryName = string;
type PostTopic = 'announcement' | 'server';
type PostID = number | string;

type PaginationOptions = {
  page?: number;
  order?: string;
  limit?: number;
};

export type { QueryName, PostTopic, PostID, PaginationOptions };

interface IPost<T> {
  data: T;
}
interface IPostID {
  postID: number;
}
interface IPostTopic {
  topic: PostTopic;
}
interface IPostEdit<T> extends IPost<T>, IPostTopic, IPostID {}
interface IPostCreate<T> extends IPost<T>, IPostTopic {}

export type { IPost, IPostEdit, IPostCreate, IPostTopic };
