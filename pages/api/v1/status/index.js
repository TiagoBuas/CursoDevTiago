/*api/status*/
import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const postgresVersionResult = await database.query("SHOW server_version");
  const postgresVersion = postgresVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections");
  const maxConnections = maxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DATABASE;
  const currentUsedConnectionsResult = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const currentUsedConnections = currentUsedConnectionsResult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        postgres_VERSION: postgresVersion,
        max_connections: parseInt(maxConnections),
        current_used_connections: parseInt(currentUsedConnections),
      },
    },
  });
}

export default status;
