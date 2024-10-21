//Teste da ferramenta get do /api/v1/migrations

test("responde should be 200 from the request status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody)
  expect(Array.isArray(responseBody)).toBe(true);

});

