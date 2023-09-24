// Local Imports
import { apiAuthorizedCaller } from "../APIConfig";

// API Types Imports
import { ErrorResponse, GeneralAPIResponse } from "../types";

// Endpoints Imports
import { postEndpoints } from "../endpoints";

// Request Types Imports
import { NewPostProps } from "../RequestTypes";

// Response Types Imports
import { NewPostResponseProps } from "../ResponseTypes";

export async function createPostAPI(body: NewPostProps) {
  return apiAuthorizedCaller<
    NewPostResponseProps,
    ErrorResponse<NewPostResponseProps>
  >({
    method: "POST",
    url: postEndpoints.CREATE_POST,
    body: body,
  });
}

export async function likePostAPI(post_id: number) {
  return apiAuthorizedCaller<
    GeneralAPIResponse,
    ErrorResponse<{ post_id: string }>
  >({
    method: "POST",
    url: postEndpoints.LIKE_A_POST(post_id),
  });
}

export async function unlikePostAPI(post_id: number) {
  return apiAuthorizedCaller<
    GeneralAPIResponse,
    ErrorResponse<{ post_id: string }>
  >({
    method: "POST",
    url: postEndpoints.UNLIKE_A_POST(post_id),
  });
}
