import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiRequest } from './client';

describe('apiRequest', () => {
  afterEach(() => vi.restoreAllMocks());

  it('throws ApiError with status on non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    }));

    await expect(apiRequest('/recipes/9999')).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
    });
  });
});