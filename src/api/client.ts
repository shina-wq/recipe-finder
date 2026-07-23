const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://dummyjson.com';

export class ApiError extends Error {
  status: number;
  url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...init } = options;
  const url = new URL(path, BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    throw new ApiError(`Request failed: ${res.statusText}`, res.status, url.toString());
  }

  return res.json() as Promise<T>;
}