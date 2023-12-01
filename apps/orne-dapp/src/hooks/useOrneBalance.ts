import { oneMinute } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { BalanceSchema } from '~/schema/balance';

export function useOrneBalance() {
	const app = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error("Can't get balance without connected wallet");
	}

	return useQuery({
		queryKey: queryKeys.balanceOrne(connectedWallet.terraAddress),
		queryFn: async () => {
			const response = await lcd.wasm.contractQuery(app.contract.token, {
				balance: { address: connectedWallet.terraAddress },
			});

			return BalanceSchema.parse(response);
		},
		staleTime: oneMinute,
	});
}
