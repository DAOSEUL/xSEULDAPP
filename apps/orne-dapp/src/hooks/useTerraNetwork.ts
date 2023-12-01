import { useConnectedWallet } from '@terra-money/wallet-provider';
import type { LCDClientConfig } from '@terra-money/feather.js';

export function useTerraNetwork() {
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		return undefined;
	}

	const [chainID, networkInfo] = Object.entries(connectedWallet.network).find(([chainId]) =>
		['phoenix-1', 'pisco-1'].includes(chainId)
	);

	return { chainID, networkInfo } as { chainID: string; networkInfo: LCDClientConfig };
}
