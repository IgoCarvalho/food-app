import axios from 'axios';
import { env } from '@/env';

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

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
