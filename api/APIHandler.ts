// Packages Imports
import { create } from "apisauce";
import Config from "react-native-config";

// Local Imports
import { getAccessToken } from "../store/tokenStorage";

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://192.168.0.110:8000' : Config.PROD_BASE_URL;

const baseUnAuthorizedAPIInstance = create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

const baseAuthorizedAPIInstance = create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

baseAuthorizedAPIInstance.addAsyncRequestTransform((request) => async (): Promise<any> => {
    const accessToken = getAccessToken()

    // add the new access token to the headers
    if (request.headers !== undefined)
        request.headers.Authorization = `Bearer ${accessToken}`

    // return the request 
    return request
})

export { baseAuthorizedAPIInstance, baseUnAuthorizedAPIInstance };