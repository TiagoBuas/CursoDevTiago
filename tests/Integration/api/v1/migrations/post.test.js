//Teste da ferramenta post do /api/v1/migrations

import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
	await database.clearDatabase();
	await orchestrator.wait_for_all_services();
});

test("responde should be 201 from the request status when there are pendings migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
});
  expect(response.status).toBe(201);
  const responseBody = await response.json();
  expect(responseBody[0].path.indexOf("migrations")).toBeGreaterThan(-1);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

});

test("responde should be 200 from the request status when there are no migrations to run", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations",{
    method: "POST",
});
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBe(0);

});
