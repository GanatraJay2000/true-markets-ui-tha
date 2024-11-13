import { z } from "zod";

export const taskSchema = z.object({
  product_id: z.string(),
  best_bid: z.string(),
  best_bid_size: z.string(),
  best_ask: z.string(),
  best_ask_size: z.string(),
  price: z.string(),
  last_size: z.string(),
  time: z.string(),
  higher: z.boolean().default(false),
  type: z.string().default("ticker"),
});

export type Task = z.infer<typeof taskSchema>;
