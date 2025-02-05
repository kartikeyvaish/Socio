// Local Imports
import { Comment, User } from '../../types/model';
import endpoints from '../endpoints';

// Named Imports
import { executeApiCall } from '../index';

// Request/Response Types
import { CommentPayload, PostDetailsResponse } from './types';

class Post {
  getPostDetails = async (post_id: number) => {
    return executeApiCall<PostDetailsResponse>({
      method: 'GET',
      url: endpoints.posts.show(post_id)
    });
  };

  likeAPost = async (post_id: number) => {
    return executeApiCall({
      method: 'POST',
      url: endpoints.posts.like(post_id)
    });
  };

  unLikeAPost = async (post_id: number) => {
    return executeApiCall({
      method: 'POST',
      url: endpoints.posts.unlike(post_id)
    });
  };

  savePost = async (post_id: number) => {
    return executeApiCall({
      method: 'POST',
      url: endpoints.posts.save(post_id)
    });
  };

  unsavePost = async (post_id: number) => {
    return executeApiCall({
      method: 'POST',
      url: endpoints.posts.unsave(post_id)
    });
  };

  commentOnPost = async (post_id: number, body: CommentPayload) => {
    return executeApiCall<{ comment: Comment }>({
      method: 'POST',
      url: endpoints.posts.comment(post_id),
      data: body
    });
  };

  getComments = async (post_id: number, limit: number = 10, offset: number = 0) => {
    return executeApiCall<{ comments: Comment[] }>({
      method: 'GET',
      url: endpoints.posts.comments(post_id),
      params: { limit, offset }
    });
  };

  getLikesOnPost = async (post_id: number, limit: number = 10, offset: number = 0) => {
    return executeApiCall<{ likes: Array<User>; has_more: boolean }>({
      method: 'GET',
      url: endpoints.posts.likes(post_id),
      params: { limit, offset }
    });
  };
}

const postsApi = new Post();

export default postsApi;
