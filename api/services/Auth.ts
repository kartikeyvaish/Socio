// Packages Imports
import { ApiResponse } from "apisauce";

// API Types Imports
import { baseUnAuthorizedAPIInstance } from "../APIHandler";
import { ErrorResponse } from "../types";

// Endpoints Imports
import { authEndpoints } from "../endpoints";

// Request Types Imports
import { LoginRequestProps } from "../RequestTypes";

// Response Types Imports
import { LoginResponseProps } from "../ResponseTypes";

export function loginAPI(body: LoginRequestProps): Promise<ApiResponse<LoginResponseProps, ErrorResponse<LoginRequestProps>>> {
    return baseUnAuthorizedAPIInstance.post(authEndpoints.LOGIN, body);
}
