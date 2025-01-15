//Teste da ferramenta get do /api/v1/migrations

import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
	await database.clearDatabase();
	await orchestrator.wait_for_all_services();
});

test("responde should be 200 from the request status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

});
