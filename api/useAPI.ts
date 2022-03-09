// packages imports
import { create, CancelToken } from "apisauce";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

// Local Imports
import env from "../config/env";
import JWT from "../auth/JWT";
import SecureStore from "../auth/SecureStore";
import ToastMessages from '../constants/Messages';

// Construct the Base URL
const baseURL = (env.mode === "development" ? env.dev_base_url : env.prod_base_url) + env.apiVersion

// Main Route for Auth Endpoints
const AuthRoute = env.auth;

// Initialize Cancel Token for App API calls
const appClientCancelToken = CancelToken.source()

// get new access token
const get_new_access_token = async (refresh_token: string) => {
    try {
        // call the refresh token api to get a new access token
        const newResponse = await fetch(`${baseURL}${AuthRoute}/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refresh_token}`,
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

// export the hook
export default function useAPI({ logout }: { logout: () => void }) {

    // Creating the Auth API Client
    const authAPIClient = create({
        baseURL: baseURL,
        timeout: 15000,
        timeoutErrorMessage: ToastMessages.SERVER_ERROR_MESSAGE,
    });

    // Creating the App API Client
    const appApiClient = create({
        baseURL: baseURL,
        timeout: 15000,
        timeoutErrorMessage: ToastMessages.SERVER_ERROR_MESSAGE,
        cancelToken: appClientCancelToken.token
    });

    // before performing any api call, check if the access token is expired
    appApiClient.addAsyncRequestTransform(request => async (): Promise<any> => {
        // Get the access token from the SecureStore
        const access_token = await SecureStore.GetItem("access_token");

        // Decode the access token
        const decoded: any = jwtDecode(access_token);

        // Check if the token is expired
        const isExpired = dayjs.unix(decoded.exp).diff(dayjs(), 'seconds') < 10;

        // if token is not expired, then add the access token to the headers
        if (!isExpired) {
            request.headers.Authorization = `Bearer ${access_token}`;
            return request;
        }

        // if token is expired, then get the refresh token from the SecureStore
        const refresh_token = await SecureStore.GetItem("refresh_token");

        if (!refresh_token) logout();

        // Decode the access token
        const decodedRefresh: any = jwtDecode(refresh_token);

        // Check if refresh token is expired
        const isRefreshTokenExpired = dayjs.unix(decodedRefresh.exp).diff(dayjs(), 'seconds') < 10;

        // if refresh token is expired, then logout
        if (isRefreshTokenExpired) {
            logout();
            appClientCancelToken.cancel();
            return;
        }

        const newResponse = await get_new_access_token(refresh_token);

        if (refresh_token === null) {
            logout();
            appClientCancelToken.cancel();
            return;
        }

        // get the user_token and decode it to get the access_token and refresh_token
        const decodedData: any = JWT.decodeToken(newResponse.user_token);

        // Store the tokens in the SecureStore
        SecureStore.SetItem("access_token", decodedData.access_token);
        SecureStore.SetItem("refresh_token", decodedData.refresh_token);

        // add the new access token to the headers
        request.headers.Authorization = `Bearer ${decodedData.access_token}`;

        // return the request
        return request;
    });

    // in any case if apiResponse is 404 then logout
    appApiClient.addAsyncResponseTransform(response => async (): Promise<any> => {
        if (response.status === 401) {
            logout();
            appClientCancelToken.cancel();
            return;
        }

        return response;
    });

    // Exports
    return { authAPIClient, appApiClient, };
}