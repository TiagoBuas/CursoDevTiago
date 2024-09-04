import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValue(),
  }
  );
  try {
    await client.connect();
    const response = await client.query(queryObject);
    return response;
  } catch (err) {
    console.error(err);
    throw(err);
  } finally {
    await client.end();
  }
}
export default {
  query: query,
};


function getSSLValue(){

  if (process.env.POSTGRES_CA){{
    POSTGRES_CA : process.env.POSTGRES_CA
  }}

  process.env.NODE_ENV === 'development' ? false : true
}
