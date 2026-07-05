import { test, expect } from '@playwright/test';

test.describe('Auth.js API routes', () => {
  test('GET /api/auth/csrf returns a csrf token', async ({ request }) => {
    const response = await request.get('/api/auth/csrf');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(typeof body.csrfToken).toBe('string');
    expect(body.csrfToken.length).toBeGreaterThan(0);
  });

  test('GET /api/auth/session returns null when unauthenticated', async ({ request }) => {
    const response = await request.get('/api/auth/session');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toBeNull();
  });

  test('credentials callback authenticates a valid mock user', async ({ request }) => {
    const csrfResponse = await request.get('/api/auth/csrf');
    const { csrfToken } = await csrfResponse.json();

    const callbackResponse = await request.post('/api/auth/callback/credentials', {
      form: {
        email: 'ok@example.com',
        password: 'password123',
        csrfToken,
        json: 'true',
      },
      maxRedirects: 0,
    });

    expect(callbackResponse.status()).toBe(302);
  });

  test('credentials callback rejects an invalid password', async ({ request }) => {
    const csrfResponse = await request.get('/api/auth/csrf');
    const { csrfToken } = await csrfResponse.json();

    const callbackResponse = await request.post('/api/auth/callback/credentials', {
      form: {
        email: 'ok@example.com',
        password: 'not-the-right-password',
        csrfToken,
        json: 'true',
      },
      maxRedirects: 0,
    });

    const location = callbackResponse.headers()['location'] ?? '';
    expect(location).toContain('error');
  });
});
