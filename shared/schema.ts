import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const interactions = pgTable("interactions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'yes'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInteractionSchema = createInsertSchema(interactions).omit({ 
  id: true, 
  createdAt: true 
});

export type Interaction = typeof interactions.$inferSelect;
export type InsertInteraction = z.infer<typeof insertInteractionSchema>;
