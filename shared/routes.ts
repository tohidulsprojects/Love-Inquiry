import { z } from 'zod';
import { insertInteractionSchema, interactions } from './schema';

export const api = {
  interactions: {
    create: {
      method: 'POST' as const,
      path: '/api/interactions',
      input: insertInteractionSchema,
      responses: {
        201: z.custom<typeof interactions.$inferSelect>(),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
