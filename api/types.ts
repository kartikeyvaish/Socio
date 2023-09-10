export interface ErrorResponse<RequestBodyValues> {
    errors: {
        base?: string;
        fields?: {
            [key in keyof RequestBodyValues]?: Array<string>
        }
    };
    message?: string;
}

export interface GeneralAPIResponse {
    message: string;
}