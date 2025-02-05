import { Post, Profile } from '../../types/model';
import { ApiPaginationResponseProps } from '../types';

export interface ProfilePostsResponse extends ApiPaginationResponseProps {
  posts: Array<Post>;
}

export interface ProfileDetailsResponse {
  profile: Profile;
}
