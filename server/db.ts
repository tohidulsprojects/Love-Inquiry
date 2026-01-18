import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const { Pool } = pg;

let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  const configPath = join(process.cwd(), "config.json");
  if (existsSync(configPath)) {
    try {
      const config = JSON.parse(readFileSync(configPath, "utf-8"));
      databaseUrl = config.DATABASE_URL;
    } catch (e) {
      console.error("Error reading config.json:", e);
    }
  }
}

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set in environment variables or config.json. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle(pool, { schema });
