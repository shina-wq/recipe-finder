import type { AuthUser } from '@/types/user';

const STORAGE_KEY = 'forkful:auth-user';

function readUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

let user = readUser();
const listeners = new Set<() => void>();

function persist() {
  user
    ? localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    : localStorage.removeItem(STORAGE_KEY);
  listeners.forEach((listener) => listener());
}

export const authStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return user;
  },
  setUser(next: AuthUser) {
    user = next;
    persist();
  },
  clearUser() {
    user = null;
    persist();
  },
};