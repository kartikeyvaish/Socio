export interface ErrorResponse<RequestBodyValues> {
  errors: {
    base?: string;
    fields?: {
      [key in keyof RequestBodyValues]?: Array<string>;
    };
  };
  message?: string;
}

export interface GeneralAPIResponse {
  message: string;
}

export interface ApiCallProps {
  method: "POST" | "GET" | "PUT" | "DELETE";
  url: string;
  body?: any;
  params?: any;
}

export type APIType<ResponseProps, ErrorResponse> = Promise<
  | {
      ok: true;
      data: ResponseProps;
    }
  | {
      ok: false;
      data: ErrorResponse;
    }
>;
