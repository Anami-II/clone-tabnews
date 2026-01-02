import database from "infra/database.js";

async function status(request, response) {
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;

  const openedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });

  const openedConnectionsValue = openedConnectionsResult.rows[0].count;

  response.json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        max_connections: maxConnectionsValue,
        opened_connections: openedConnectionsValue,
        version: databaseVersionValue,
      },
    },
  });
}

export default status;
