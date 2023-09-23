// Packages Imports
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";

// Local Imports
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../store/tokenStorage";
import { APIType, ApiCallProps } from "./types";
import { decodeToken } from "../helpers/jwt";
import env from "../helpers/env";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.0.106:8000"
    : env.PROD_BASE_URL;

const baseAuthorizedAPIInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const baseUnAuthorizedAPIInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getNewAccessToken = async (refresh_token: string) => {
  try {
    // call the refresh token api to get a new access token
    const newResponse = await fetch(`${BASE_URL}/api/auth/tokens/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refresh_token}`,
      },
    });

    if (newResponse.status === 200) {
      // transform the response to json
      const newData = await newResponse.json();

      return newData;
    }

    return null;
  } catch (error) {
    return null;
  }
};

baseAuthorizedAPIInstance.interceptors.request.use(async function (config) {
  const accessToken = getAccessToken();

  if (!accessToken) return config;

  // Decode the access token
  const decoded: any = decodeToken(accessToken);

  // Check if the token is expired
  const isExpired = dayjs.unix(decoded.exp).diff(dayjs(), "seconds") < 10;

  // if token is not expired, then add the access token to the headers
  if (!isExpired) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  // if token is expired, then get the refresh token from the SecureStore
  const refresh_token = getRefreshToken();

  if (!refresh_token) {
    // Implement logout logic here
  }

  // Decode the access token
  const decodedRefresh: any = decodeToken(refresh_token);

  // Check if refresh token is expired
  const isRefreshTokenExpired =
    dayjs.unix(decodedRefresh.exp).diff(dayjs(), "seconds") < 10;

  // if refresh token is expired, then logout
  if (isRefreshTokenExpired) {
    // Implement logout logic here
  }

  const newResponse = await getNewAccessToken(refresh_token);

  if (refresh_token === null) {
    // Implement logout logic here
  }

  // Store the tokens in the SecureStore
  setAccessToken(newResponse.access_token);
  setRefreshToken(newResponse.refresh_token);

  config.headers.Authorization = `Bearer ${newResponse.access_token}`;

  return config;
});

export async function apiAuthorizedCaller<ResponseProps, ErrorResponse = any>(
  props: ApiCallProps
): APIType<ResponseProps, ErrorResponse> {
  try {
    // Destrcuture props
    const { method, url, body, params } = props;

    if (!method) return null;

    if (!url) return null;

    let apiResponse: AxiosResponse<ResponseProps>;

    switch (method) {
      case "GET":
        apiResponse = await baseAuthorizedAPIInstance.get<ResponseProps>(url, {
          params,
        });
        break;

      case "POST":
        apiResponse = await baseAuthorizedAPIInstance.post<ResponseProps>(
          url,
          body,
          {
            params,
          }
        );
        break;

      case "PUT":
        apiResponse = await baseAuthorizedAPIInstance.put<ResponseProps>(
          url,
          body,
          {
            params,
          }
        );
        break;

      case "DELETE":
        apiResponse = await baseAuthorizedAPIInstance.delete<ResponseProps>(
          url,
          {
            params,
          }
        );
        break;

      default:
        apiResponse = null;
        break;
    }

    return { ok: true, data: apiResponse.data };
  } catch (error) {
    return { ok: false, data: error.response.data };
  }
}

export async function apiUnauthorizedCaller<ResponseProps, ErrorResponse = any>(
  props: ApiCallProps
): APIType<ResponseProps, ErrorResponse> {
  try {
    // Destrcuture props
    const { method, url, body, params } = props;

    if (!method) return null;

    if (!url) return null;

    let apiResponse: AxiosResponse<ResponseProps>;

    switch (method) {
      case "GET":
        apiResponse = await baseUnAuthorizedAPIInstance.get<ResponseProps>(
          url,
          {
            params,
          }
        );
        break;

      case "POST":
        apiResponse = await baseUnAuthorizedAPIInstance.post<ResponseProps>(
          url,
          body,
          {
            params,
          }
        );
        break;

      case "PUT":
        apiResponse = await baseUnAuthorizedAPIInstance.put<ResponseProps>(
          url,
          body,
          {
            params,
          }
        );
        break;

      case "DELETE":
        apiResponse = await baseUnAuthorizedAPIInstance.delete<ResponseProps>(
          url,
          {
            params,
          }
        );
        break;

      default:
        apiResponse = null;
        break;
    }

    return { ok: true, data: apiResponse.data };
  } catch (error) {
    return { ok: false, data: error.response.data };
  }
}
