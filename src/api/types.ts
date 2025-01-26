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
