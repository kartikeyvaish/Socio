// Local Imports
import { apiAuthorizedCaller } from "../APIConfig";

// API Types Imports
import { ErrorResponse } from "../types";

// Endpoints Imports
import { fileEndpoints } from "../endpoints";

// Request Types Imports
import { UploadSignatureRequestProps } from "../RequestTypes";

// Response Types Imports
import {
  CloudinaryUploadResponseProps,
  UploadResponseProps,
} from "../ResponseTypes";
import env from "../../helpers/env";

const CLOUDINARY_CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME;

export async function getUploadSignature(body: UploadSignatureRequestProps) {
  return apiAuthorizedCaller<
    UploadResponseProps,
    ErrorResponse<UploadSignatureRequestProps>
  >({
    method: "POST",
    url: fileEndpoints.GET_UPLOAD_SIGNATURE,
    body: body,
  });
}

export async function uploadFileToCloudinary(
  body: any
): Promise<CloudinaryUploadResponseProps> {
  try {
    // call the refresh token api to get a new access token
    let newResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/form-data",
        },
        body,
      }
    );

    let newResponseJson = await newResponse.json();

    return newResponseJson;
  } catch (error) {
    return null;
  }
}
