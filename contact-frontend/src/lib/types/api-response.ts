interface SuccessResponse<T> {
    status: 'success'
    code: number
    message: string
    data: T
}

interface ErrorResponse {
    success: false
    timestamp: string
    path: string
    error: {
        code: number
        message: string
    }
}

export function isSuccess<T>(res: ApiResponse<T>): res is SuccessResponse<T> {
    return 'status' in res && res.status === 'success'
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse