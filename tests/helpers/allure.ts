import type { Page, APIResponse } from '@playwright/test';
import {
  attachment,
  ContentType,
  ALLURE_HTTP_EXCHANGE_CONTENT_TYPE,
  ALLURE_HTTP_EXCHANGE_SCHEMA_VERSION,
  type HttpExchange,
  type HttpExchangeNameValue,
} from 'allure-js-commons';

/** Attaches a screenshot of the current page state to the enclosing Allure step. */
export async function stepScreenshot(page: Page, name: string): Promise<void> {
  await attachment(name, await page.screenshot(), ContentType.PNG);
}

function toNameValueList(headers?: Record<string, string>): HttpExchangeNameValue[] | undefined {
  if (!headers) return undefined;
  return Object.entries(headers).map(([name, value]) => ({ name, value }));
}

/**
 * Attaches one API call's full request/response exchange (method, url, headers, body,
 * status) to the enclosing Allure step, using Allure's native HTTP-exchange attachment
 * type so it renders as a formatted request/response viewer rather than a raw JSON dump.
 */
export async function attachApiExchange(opts: {
  method: string;
  requestHeaders?: Record<string, string>;
  requestBody?: unknown;
  response: APIResponse;
}): Promise<void> {
  const responseHeaders = opts.response.headers();
  const responseBody = await opts.response.text();

  const exchange: HttpExchange = {
    schemaVersion: ALLURE_HTTP_EXCHANGE_SCHEMA_VERSION,
    request: {
      method: opts.method,
      url: opts.response.url(),
      headers: toNameValueList(opts.requestHeaders),
      body:
        opts.requestBody === undefined
          ? undefined
          : {
              contentType: 'application/json',
              value:
                typeof opts.requestBody === 'string'
                  ? opts.requestBody
                  : JSON.stringify(opts.requestBody),
            },
    },
    response: {
      status: opts.response.status(),
      statusText: opts.response.statusText(),
      headers: toNameValueList(responseHeaders),
      body: { contentType: responseHeaders['content-type'], value: responseBody },
    },
  };

  await attachment('API exchange', JSON.stringify(exchange), ALLURE_HTTP_EXCHANGE_CONTENT_TYPE);
}
