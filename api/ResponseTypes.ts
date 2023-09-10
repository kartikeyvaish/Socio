import { GeneralAPIResponse } from "./types";

export interface LoginResponseProps extends GeneralAPIResponse {
    otp_id: number
}