import { PostProps } from "../../types/AppTypes";

export interface PostsStoreStateProps {
  feedPosts: Array<PostProps>;
  usersPosts: Array<PostProps>;
}

export interface PostsActionPayloadProps {
  feedPosts?: Array<PostProps>;
  usersPosts?: Array<PostProps>;
  feedPost?: PostProps;
  userPost?: PostProps;
  feedPostId?: PostProps["id"];
  userPostId?: PostProps["id"];
}
