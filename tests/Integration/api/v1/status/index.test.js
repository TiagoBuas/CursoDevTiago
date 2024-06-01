//Teste da ferramenta index do /api/v1/status
test("responde should be 200 from the request status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
