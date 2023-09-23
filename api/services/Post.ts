// Local Imports
import { apiAuthorizedCaller } from "../APIConfig";

// API Types Imports
import { ErrorResponse } from "../types";

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
