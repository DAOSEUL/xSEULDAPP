import { oneMinute } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';

export function useShare(amountOfLP: string | number = 0) {
	const app = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error('No connected wallet found');
	}

	return useQuery({
		queryKey: queryKeys.poolShare(app.contract.orneLunaPair, amountOfLP),
		queryFn: async () => {
			const response = await lcd.wasm.contractQuery(app.contract.orneLunaPair, {
				share: { amount: amountOfLP.toString() },
			});

			const orneToken = response.find((token) => 'token' in token.info);
			const lunaToken = response.find((token) => 'native_token' in token.info);

			return { amountLuna: lunaToken.amount, amountOrne: orneToken.amount };
		},
		staleTime: oneMinute,
	});
}
