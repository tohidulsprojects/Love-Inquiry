import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCreateInteraction() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.interactions.create.path, {
        method: api.interactions.create.method,
        headers: { "Content-Type": "application/json" },
        // Schema omits type but backend might expect it or default it
        // Since input is omit({id, createdAt}), we send an empty object
        // and let backend handle the type 'yes' logic if hardcoded, 
        // or we send { type: 'yes' } if schema allowed it.
        // Based on schema `insertInteractionSchema`, it omits id/createdAt.
        // It should include `type`.
        body: JSON.stringify({ type: 'yes' }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to record interaction");
      return api.interactions.create.responses[201].parse(await res.json());
    },
  });
}
