//Teste da ferramenta get do /api/v1/migrations

import database from "infra/database.js";


test("responde should be 200 from the request status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  console.log(process.env.POSTGRES_PASSWORD);
  console.log(process.env.NODE_ENV);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

});

