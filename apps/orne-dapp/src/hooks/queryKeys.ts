export const queryKeys = {
	balanceRoot: ['balances'] as const,
	balanceOrne: (walletAddress: string) => [...queryKeys.balanceRoot, 'orne', walletAddress] as const,
	balanceLuna: (walletAddress: string) => [...queryKeys.balanceRoot, 'luna', walletAddress] as const,
	balanceLP: (walletAddress: string) => [...queryKeys.balanceRoot, 'lp', walletAddress] as const,
	poolRoot: ['pools'] as const,
	poolInfo: (poolAddress: string) => [...queryKeys.poolRoot, 'info', poolAddress] as const,
	poolShare: (poolAddress: string, amount: any) => [...queryKeys.poolRoot, 'share', poolAddress, amount] as const,
	presaleRoot: ['presale'] as const,
	presaleTokens: (walletAddress: string) => [...queryKeys.presaleRoot, 'tokens', walletAddress] as const,
};
