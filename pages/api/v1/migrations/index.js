/*api/status*/
import database from "infra/database";
import migrationRunner from "node-pg-migrate";

export default async function status(request, response) {
  const allowedMethod = ["GET", "POST"];
  if (!allowedMethod.includes(request.method)) {
    return response.status(405).json({
      error: "Method not allowed",
    });
  }

  let dbConnected;

  try {
    dbConnected = await database.getNewClient();

    const defautMigrationOptions = {
      dbClient: dbConnected,
      dryRun: true,
      dir: "infra/migrations",
      direction: "up",
      verbose: true,
      migrationsTable: "pgMigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defautMigrationOptions);
      response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defautMigrationOptions,
        dryRun: false,
      });
      if (migratedMigrations.length > 0) {
        response.status(201).json(migratedMigrations);
      } else {
        response.status(200).json(migratedMigrations);
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dbConnected.end();
  }
}
