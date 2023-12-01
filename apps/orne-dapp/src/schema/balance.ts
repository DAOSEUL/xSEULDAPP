import { z } from 'zod';

export const BalanceSchema = z.object({
	balance: z.string(),
});
