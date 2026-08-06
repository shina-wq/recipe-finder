import { useCallback, useSyncExternalStore } from 'react';
import { authStore } from '@/lib/authStore';

export function useAuth() {
  const user = useSyncExternalStore(authStore.subscribe, authStore.getSnapshot);
  const logout = useCallback(() => authStore.clearUser(), []);

  return { user, isAuthenticated: !!user, logout };
}