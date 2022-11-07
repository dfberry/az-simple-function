import { test, expect } from '@playwright/test';

test.beforeAll(async ({request}, testInfo)=>{
  console.log(`Running ${testInfo.title}`);
  const apiResponse = await request.get(`http://localhost:7071/api/status`);
  console.log(apiResponse);
});

test('getSecret?secretname=test', async ({ request }) => {
  const apiResponse = await request.get('http://localhost:7071/api/getSecret?secretname=test');

  // Expect a title "to contain" a substring.
  await expect(apiResponse.ok()).toBeTruthy();

  const jsonReponse = await apiResponse.json();

  expect(JSON.stringify(jsonReponse)).toEqual(JSON.stringify({"name": "test", "value": "abc"}))
});
