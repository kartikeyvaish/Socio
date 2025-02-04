import { Post } from '../../types/model';
import { ApiPaginationResponseProps } from '../types';

export interface FeedResponse extends ApiPaginationResponseProps {
  feed: Array<Post>;
}
