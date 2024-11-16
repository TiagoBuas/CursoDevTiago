/*api/status*/
import database from "infra/database";
import migrationRunner from "node-pg-migrate";


export default async function status(request, response){

  const dbConnected = await database.getNewClient();

  const defautMigrationOptions = {
    dbClient: dbConnected,
    dryRun: true,
    dir: "infra/migrations",
    direction: "up",
    verbose: true,
    migrationsTable: "pgMigrations",
  }

  if (request.method === "GET") {
  const pendingMigrations = await migrationRunner(
    defautMigrationOptions
  )
  dbConnected.end();
  response.status(200).json(pendingMigrations);

  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defautMigrationOptions,
      dryRun: false
  })
  dbConnected.end();
  if (migratedMigrations.length > 0 ){
      response.status(201).json(migratedMigrations);
    } else {
      response.status(200).json(migratedMigrations);
      }
  }

    
  
}
