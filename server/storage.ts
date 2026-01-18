import { interactions, type Interaction, type InsertInteraction } from "@shared/schema";

export interface IStorage {
  createInteraction(interaction: InsertInteraction): Promise<void>;
}

export class MemStorage implements IStorage {
  private interactions: Interaction[] = [];
  private currentId = 1;

  async createInteraction(insertInteraction: InsertInteraction): Promise<void> {
    const interaction: Interaction = {
      ...insertInteraction,
      id: this.currentId++,
      createdAt: new Date(),
    };
    this.interactions.push(interaction);
  }
}

export const storage = new MemStorage();
