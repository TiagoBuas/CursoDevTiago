import { Client } from "pg";

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValue(),
  });
  await client.connect();
  return client;
}

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const response = await client.query(queryObject);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}

async function clearDatabase() {
  await query("drop schema public cascade; create schema public");
}

function getSSLValue() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production";
}



const database = {
	query,
	clearDatabase,
	getNewClient,
};

export default database;
