import { env } from '@/env';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    nextPage: number | null;
    pageSize: number;
    perPage: number;
    totalCount: number;
  };
}

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, status: number, message: string) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  skipAuthRedirect?: boolean;
  params?: Record<string, unknown>;
}

class Api {
  private errorHandler?: (err: ApiError, options?: RequestOptions) => void =
    undefined;

  onError = (handler: (err: ApiError, options?: RequestOptions) => void) => {
    this.errorHandler = handler;
  };

  fetch = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
    const url = new URL(path, env.VITE_API_URL);

    if (options.params) {
      const filteredParams = Object.entries(options.params).filter(
        ([, value]) => value !== undefined && value !== null
      );
      for (const [key, value] of filteredParams) {
        url.searchParams.set(key, String(value));
      }
    }

    const res = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      const errorResponse = await res.json().catch(() => ({}));
      const apiError = new ApiError(
        errorResponse?.code || 'unknown',
        res.status,
        errorResponse?.message || res.statusText
      );

      this.errorHandler?.(apiError, options);
      throw apiError;
    }

    if (res.headers.get('content-length') === '0') {
      return {} as T;
    }

    if (res.status === 204) {
      return {} as T;
    }

    return res.json();
  };
}

export const api = new Api();
