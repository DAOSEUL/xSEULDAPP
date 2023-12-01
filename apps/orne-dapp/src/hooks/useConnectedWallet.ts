import { useConnectedWallet as useAllianceConnectedWallet } from '@terra-money/wallet-provider';
import { useTerraNetwork } from '~/hooks/useTerraNetwork';

export function useConnectedWallet() {
	const connectedWallet = useAllianceConnectedWallet();
	const network = useTerraNetwork();

	if (!connectedWallet || !network) {
		return undefined;
	}

	const terraAddress = connectedWallet.addresses[network?.chainID];

	return {
		...connectedWallet,
		terraAddress,
	};
}
