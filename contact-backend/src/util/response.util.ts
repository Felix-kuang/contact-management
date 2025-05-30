export function successResponse<T>(data: T, message = 'Success', code = 200) {
  return {
    status: 'success',
    code: code,
    message,
    data,
  };
}

export function errorResponse(
  message = 'Something went wrong',
  status = 'error',
) {
  return {
    status,
    message,
  };
}
