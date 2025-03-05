//Teste da ferramenta index do /api/v1/status

import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.wait_for_all_services();
});

describe("Anonymous user", () => {
  describe("GET to api/v1/status", () => {
    test("checks if endpoint is up", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);
    });
  });
});

describe("Anonymous user", () => {
  describe("GET to api/v1/status", () => {
    test("retrieve the date of the latency of the endpoint", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
      const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
      expect(responseBody.update_at).toBe(parsedUpdateAt);
    });
  });
});

describe("Anonymous user", () => {
  describe("GET to api/v1/status", () => {
    test("retrieve the db version", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
      expect(responseBody.dependencies.database.postgres_VERSION).toBe("16.0");
    });
  });
});

describe("Anonymous user", () => {
  describe("GET to api/v1/status", () => {
    test("retrieve the maximum connections to the db", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
      expect(responseBody.dependencies.database.max_connections).toBe(100);
    });
  });
});

describe("Anonymous user", () => {
  describe("GET to api/v1/status", () => {
    test("retrieve the current used connections on the db", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
      expect(responseBody.dependencies.database.current_used_connections).toBe(
        1,
      );
      expect(
        responseBody.dependencies.database.current_used_connections,
      ).not.toBeNull();
      expect(
        responseBody.dependencies.database.current_used_connections,
      ).toBeGreaterThan(0);
    });
  });
});
