/*api/status*/
import { up } from "infra/migrations/1727554963044_test";
import migrationRunner from "node-pg-migrate";


export default async function status(request, response){

  if (request.method === "GET") {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: false,
    dir: "infra/migrations",
    direction: "up",
    verbose: true,
    migrationsTable: "pgMigrations",
  })
  response.status(200).json(migrations);

  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: "infra/migrations",
      direction: "up",
      verbose: true,
      migrationsTable: "pgMigrations",
    })
    response.status(200).json(migrations);
    }
  
}
