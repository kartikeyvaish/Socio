import { __DEV__, DEV_BASE_URL, PROD_BASE_URL, apiVersion } from "@env"

export default {
  tagLine:
    "Helps you connect and share with yours friends, family and other people in your life.",
  messages: {
    ServerError: "Server Error. Please try again later",
    tokenExpMessage: "Your session has expired. Please login again.",
  },
  __DEV__: __DEV__,
  URLs: {
    BaseURL: __DEV__ === "true" ? DEV_BASE_URL : PROD_BASE_URL,
    apiVersion: apiVersion,
  },
};
