import { z } from 'zod';

export const TalisTokenSchema = z.object({
	token_id: z.string(),
	metadata_uri: z.string(),
});

export const TalisTokensSchema = z.object({
	tokens: z.array(TalisTokenSchema),
});

export type TalisToken = z.infer<typeof TalisTokenSchema>;
