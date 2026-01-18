import { db } from "./db";
import { interactions, type InsertInteraction } from "@shared/schema";

export interface IStorage {
  createInteraction(interaction: InsertInteraction): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createInteraction(insertInteraction: InsertInteraction): Promise<void> {
    await db.insert(interactions).values(insertInteraction);
  }
}

export const storage = new DatabaseStorage();
