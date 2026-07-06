import { test, expect } from './fixtures';
import { description } from 'allure-js-commons';
import { attachApiExchange } from '../helpers/allure';

test.describe('Auth.js API routes', () => {
  test('GET /api/auth/csrf returns a csrf token', async ({ request }) => {
    await description('The csrf endpoint always returns a non-empty token, required to authenticate the credentials callback.');

    await test.step('GET /api/auth/csrf', async () => {
      const response = await request.get('/api/auth/csrf');
      await attachApiExchange({ method: 'GET', response });

      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(typeof body.csrfToken).toBe('string');
      expect(body.csrfToken.length).toBeGreaterThan(0);
    });
  });

  test('GET /api/auth/session returns null when unauthenticated', async ({ request }) => {
    await description('An unauthenticated request to the session endpoint returns a null session, not an error.');

    await test.step('GET /api/auth/session', async () => {
      const response = await request.get('/api/auth/session');
      await attachApiExchange({ method: 'GET', response });

      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body).toBeNull();
    });
  });

  test('credentials callback authenticates a valid mock user', async ({ request }) => {
    await description('Posting a valid mock user\'s email/password plus a fresh csrf token to the credentials callback redirects (302), indicating a successful login.');

    let csrfToken: string;

    await test.step('GET /api/auth/csrf', async () => {
      const csrfResponse = await request.get('/api/auth/csrf');
      await attachApiExchange({ method: 'GET', response: csrfResponse });
      ({ csrfToken } = await csrfResponse.json());
    });

    await test.step('POST /api/auth/callback/credentials with valid credentials', async () => {
      const requestBody = { email: 'ok@example.com', password: 'password123', csrfToken, json: 'true' };
      const callbackResponse = await request.post('/api/auth/callback/credentials', {
        form: requestBody,
        maxRedirects: 0,
      });
      await attachApiExchange({ method: 'POST', requestBody, response: callbackResponse });

      expect(callbackResponse.status()).toBe(302);
    });
  });

  test('credentials callback rejects an invalid password', async ({ request }) => {
    await description('Posting the wrong password to the credentials callback redirects back with an "error" query param instead of authenticating.');

    let csrfToken: string;

    await test.step('GET /api/auth/csrf', async () => {
      const csrfResponse = await request.get('/api/auth/csrf');
      await attachApiExchange({ method: 'GET', response: csrfResponse });
      ({ csrfToken } = await csrfResponse.json());
    });

    await test.step('POST /api/auth/callback/credentials with an invalid password', async () => {
      const requestBody = { email: 'ok@example.com', password: 'not-the-right-password', csrfToken, json: 'true' };
      const callbackResponse = await request.post('/api/auth/callback/credentials', {
        form: requestBody,
        maxRedirects: 0,
      });
      await attachApiExchange({ method: 'POST', requestBody, response: callbackResponse });

      const location = callbackResponse.headers()['location'] ?? '';
      expect(location).toContain('error');
    });
  });
});
