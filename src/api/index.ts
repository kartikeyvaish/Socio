// Packages Imports
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Local Imports
import endpoints from './endpoints';
import reduxStorageEngine from '../store/reduxStoreEngine';

// Named Imports
import { authSlice } from '../store/feature/authSlice';
import { ErrorResponse, getErrorMessage, getSuccessMessage, SuccessResponse } from './types';
import { isTimeStampExpired } from '../helpers/common';
import { jwtDecode } from 'jwt-decode';
import { store } from '../store';
import { TOKENS } from '../constants/ui';

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

async function refreshToken() {
  try {
    let refresh_token = (await reduxStorageEngine.getItem(TOKENS.REFRESH_TOKEN)) || '';

    let newResponse = await fetch(`${BASE_URL}${endpoints.auth.refresh_session}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        refreshtoken: refresh_token
      }
    });

    if (newResponse.status === 200) {
      const newData = await newResponse.json();

      return newData;
    }

    return null;
  } catch (error) {
    return null;
  }
}

axiosInstance.interceptors.request.use(async function (config) {
  let authState = store.getState().auth;

  if (!authState.user) return config;

  let token = (await reduxStorageEngine.getItem(TOKENS.ACCESS_TOKEN)) || '';

  if (!token) store.dispatch(authSlice.actions.logout());

  let decoded = jwtDecode(token);

  if (!decoded) store.dispatch(authSlice.actions.logout());

  if (isTimeStampExpired(decoded.exp)) {
    const refreshResponse = await refreshToken();

    if (refreshResponse !== null) {
      token = refreshResponse.access_token;
      await reduxStorageEngine.setItem(TOKENS.ACCESS_TOKEN, token);
      await reduxStorageEngine.setItem(TOKENS.REFRESH_TOKEN, refreshResponse.refresh_token);
    }
  }

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

      if (error.response.status === 401) store.dispatch(authSlice.actions.logout());

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
