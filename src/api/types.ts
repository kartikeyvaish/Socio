export interface SuccessResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export function getSuccessMessage(data: SuccessResponse): string {
  return data.message;
}

export function getErrorMessage(data: ErrorResponse): string {
  return data.error;
}

export interface ApiPaginationResponseProps {
  has_more: boolean;
}

export interface ApiPaginationRequestProps {
  limit: number;
  offset: number;
}
