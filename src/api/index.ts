// Packages Imports
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Local Imports

// Named Imports
import { ErrorResponse, getErrorMessage, getSuccessMessage, SuccessResponse } from './types';

// Base URL for the API service that will be called
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.EXPO_PUBLIC_DEV_SERVER_BASE_URL
    : process.env.EXPO_PUBLIC_PROD_SERVER_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export interface ApiResponse<SuccessResponse, ErrorResponse> {
  ok: boolean;
  data: SuccessResponse | null;
  successText: string | null;
  error: ErrorResponse | AxiosError<unknown, unknown> | null;
  errorText: string | null;
}

axiosInstance.interceptors.request.use(function (config) {
  // const token = store.getState().auth?.user;
  const token = 'token';

  if (token) config.headers['accesstoken'] = token;

  return config;
});

export async function executeApiCall<ResponseProps = SuccessResponse, Error = ErrorResponse>(
  params: AxiosRequestConfig
): Promise<ApiResponse<ResponseProps, Error>> {
  const { data, method, url, headers, params: queryParams } = params;

  try {
    const apiResponse = await axiosInstance<ResponseProps & SuccessResponse>({
      method,
      data,
      url,
      ...(headers ? { headers } : {}),
      params: queryParams
    });

    let successText = getSuccessMessage(apiResponse.data);

    return { ok: true, data: apiResponse.data, error: null, errorText: null, successText };
  } catch (error) {
    if (error.response) {
      const errorMessage = getErrorMessage(error.response.data);

      // if (error.response.status === 401) store.dispatch(authActions.logoutUser());

      return { ok: false, error, data: null, errorText: errorMessage, successText: null };
    } else {
      return {
        ok: false,
        data: null,
        errorText: 'An error occurred while making the API call',
        error: JSON.parse(JSON.stringify(error)),
        successText: null
      };
    }
  }
}

export default axiosInstance;
