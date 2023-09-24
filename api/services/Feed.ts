// Local Imports
import { apiAuthorizedCaller } from "../APIConfig";
import { FeedResponseProps } from "../ResponseTypes";
import { feedEndpoints } from "../endpoints";

export async function getFeed() {
  return apiAuthorizedCaller<FeedResponseProps, any>({
    method: "GET",
    url: feedEndpoints.GET_FEED,
  });
}
