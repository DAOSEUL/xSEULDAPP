import { z } from 'zod';

export const SimulationSchema = z.object({
	return_amount: z.string(),
	spread_amount: z.string(),
	commission_amount: z.string(),
});
