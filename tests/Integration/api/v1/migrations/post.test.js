//Teste da ferramenta post do /api/v1/migrations
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.wait_for_all_services();
});

describe("Anonymous user", () => {
  describe("POST to api/v1/migrations", () => {
    test("for the first time", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });
      expect(response.status).toBe(201);
      const responseBody = await response.json();
      expect(responseBody[0].path.indexOf("migrations")).toBeGreaterThan(-1);
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});

describe("Anonymous user", () => {
  describe("get to api/v1/migrations", () => {
    test("for the second time", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });
      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBe(0);
    });
  });
});
