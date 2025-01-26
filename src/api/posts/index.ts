// Local Imports
import endpoints from '../endpoints';

// Named Imports
import { executeApiCall } from '../index';

// Request/Response Types
import { PostDetailsResponse } from './types';

class Post {
  getPostDetails = async (post_id: string) => {
    return executeApiCall<PostDetailsResponse>({
      method: 'GET',
      url: endpoints.posts.show(post_id)
    });
  };
}

const postsApi = new Post();

export default postsApi;
