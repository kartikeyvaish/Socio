// Local Imports
import endpoints from '../endpoints';

// Named Imports
import { executeApiCall } from '../index';

// Request/Response Types
import { PostDetailsResponse } from './types';

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
}

const postsApi = new Post();

export default postsApi;
