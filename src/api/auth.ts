import { apiRequest } from './client';
import type { AuthUser } from '@/types/user';

export interface LoginPayload {
  username: string;
  password: string;
}

const TOKEN_EXPIRY_MINUTES = 60;

export function login({ username, password }: LoginPayload) {
  return apiRequest<AuthUser>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: TOKEN_EXPIRY_MINUTES }),
  });
}