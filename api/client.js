import { create } from "apisauce";
import config from "../config/config";

const apiClient = create({
  baseURL: config.URLs.BaseURL + config.URLs.apiVersion,
  timeout: 15000,
});

export default apiClient;
