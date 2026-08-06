import { apiRequest } from './client';

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface CreatedUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export function createUser(payload: CreateUserPayload) {
  return apiRequest<CreatedUser>('/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}