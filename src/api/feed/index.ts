// Local Imports
import endpoints from '../endpoints';

// Named Imports
import { ApiPaginationRequestProps } from '../types';
import { executeApiCall } from '../index';
import { FeedResponse } from './types';

// Request/Response Types

class Feed {
  getFeed = async (params: ApiPaginationRequestProps) => {
    return executeApiCall<FeedResponse>({
      method: 'GET',
      url: endpoints.feed.getFeed,
      params
    });
  };
}

const feedApi = new Feed();

export default feedApi;
