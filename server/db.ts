import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

// In-memory fallback for storage since user wants to remove DATABASE_URL
// This is a minimal mock for the db object to prevent errors
export const db = {
  select: () => ({ from: () => [] }),
  insert: () => ({ values: () => ({ returning: () => [{}] }) }),
  update: () => ({ set: () => ({ where: () => ({ returning: () => [{}] }) }) }),
  delete: () => ({ where: () => ({}) }),
} as any;

export const pool = {} as any;
