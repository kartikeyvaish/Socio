import { Post } from '../../types/model';

export interface PostDetailsResponse {
  post: Post;
}

export interface CommentPayload {
  comment: string;
}
