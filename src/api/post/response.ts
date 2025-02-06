type PostDeleteResponse = {
  topic: string;
  message: string;
};

type PostEditResponse = {
  postID: string;
};

type PostCreateResponse = {
  postID: string;
};

export type { PostDeleteResponse, PostEditResponse, PostCreateResponse };
