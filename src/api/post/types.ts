type PostTopic = 'announcement' | 'server';
type PostID = number | string;

type PaginationOptions = {
  page?: number;
  order?: string;
  limit?: number;
};

type PostSearchOptions = {
  creator?: string;
};
type PostListReturn<PostListType> = {
  list: PostListType[];
  pages: number;
  limit: number;
};
export type { PostTopic, PostID, PaginationOptions, PostSearchOptions, PostListReturn };

interface IPost<T> {
  data: T;
}
interface IPostID {
  postID: string | number;
}
interface IPostTopic {
  topic: PostTopic;
}
interface IPostDelete extends IPostTopic, IPostID {}
interface IPostEdit<T> extends IPost<T>, IPostTopic, IPostID {}
interface IPostCreate<T> extends IPost<T>, IPostTopic {}

export type { IPost, IPostEdit, IPostCreate, IPostDelete, IPostTopic };
