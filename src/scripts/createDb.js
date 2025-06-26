// scripts/createDatabase.js
import 'dotenv/config';
import { Client } from 'pg';
import { URL } from 'url';
import { getDataSource } from '../lib/typeorm.js';

(async () => {
  try {
    const dbUrl = new URL(process.env.DATABASE_URL);
    const dbName = dbUrl.pathname.slice(1);
    const adminUrl = new URL(process.env.DATABASE_URL);

    adminUrl.pathname = '/postgres'; // connect to default DB

    // Step 1: Connect to 'postgres' to create the target DB
    const client = new Client({ connectionString: adminUrl.toString() });
    await client.connect();

    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created.`);
    } else {
      console.log(`ℹ️ Database "${dbName}" already exists.`);
    }

    await client.end();

    // Step 2: Call getDataSource to initialize
    const dataSource = await getDataSource();
    console.log("✅ DataSource initialized.");

    // Optional: Close the connection if needed
    await dataSource.destroy();

  } catch (err) {
    console.error('❌ Error creating DB or initializing:', err);
    process.exit(1);
  }
})();
