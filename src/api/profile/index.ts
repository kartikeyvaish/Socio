// Local Imports
import endpoints from '../endpoints';

// Named Imports
import { ApiPaginationRequestProps } from '../types';
import { executeApiCall } from '../index';
import { ProfileDetailsResponse, ProfilePostsResponse } from './types';

// Request/Response Types

class Profile {
  getProfilePosts = async (params: ApiPaginationRequestProps) => {
    return executeApiCall<ProfilePostsResponse>({
      method: 'GET',
      url: endpoints.profile.getProfilePosts,
      params
    });
  };

  getProfileDetails = async (username: string) => {
    return executeApiCall<ProfileDetailsResponse>({
      method: 'GET',
      url: endpoints.profile.getProfileDetails(username)
    });
  };
}

const profileApi = new Profile();

export default profileApi;
