//Teste da ferramenta get do /api/v1/migrations
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.wait_for_all_services();
});

describe("Anonymous user", () => {
  describe("get to api/v1/migrations", () => {
    test("retrieve pendings migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
