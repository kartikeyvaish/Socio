// Local Imports
import { apiAuthorizedCaller } from "../APIConfig";
import { UserProfileResponseProps } from "../ResponseTypes";
import { profileEndpoints } from "../endpoints";

export async function getUserProfile(userId: number) {
  return apiAuthorizedCaller<UserProfileResponseProps, any>({
    method: "GET",
    url: profileEndpoints.GET_USER_PROFILE(userId),
  });
}
