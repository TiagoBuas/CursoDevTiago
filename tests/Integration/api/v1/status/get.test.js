//Teste da ferramenta index do /api/v1/status

import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.wait_for_all_services();
});

test("responde should be 200 from the request status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
});

test("date of the endpoint status should be the same from the status.js", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toBe(parsedUpdateAt);
});

test("response should be the version of the postgreSQL local DB", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.postgres_VERSION).toBe("16.0");
});

test("response should be the maximun connections permited on the postgreSQL local DB", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.dependencies.database.max_connections).toBe(100);
});

test("response should be the current used connections of the postgreSQL local DB", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  console.log(process.env.NODE_ENV);

  expect(responseBody.dependencies.database.current_used_connections).toBe(1);
  expect(
    responseBody.dependencies.database.current_used_connections,
  ).not.toBeNull();
  expect(
    responseBody.dependencies.database.current_used_connections,
  ).toBeGreaterThan(0);
});
