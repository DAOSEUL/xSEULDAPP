import { fiveMinute } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { BalanceSchema } from '~/schema/balance';

export function useLPBalance() {
	const app = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error("Can't get balance without connected wallet");
	}

	return useQuery({
		queryKey: queryKeys.balanceLP(connectedWallet.terraAddress),
		queryFn: async () => {
			const fetchLPBalance = lcd.wasm.contractQuery(app.contract.lp, {
				balance: { address: connectedWallet.terraAddress },
			});

			const fetchStakedLPBalance = lcd.wasm.contractQuery(app.contract.astroGenerator, {
				deposit: { lp_token: app.contract.lp, user: connectedWallet.terraAddress },
			});

			const [lpBalance, stakedLPBalance] = await Promise.all([fetchLPBalance, fetchStakedLPBalance]);

			const lpBalanceResponse = BalanceSchema.parse(lpBalance);
			const stakedLPBalanceResponse = BalanceSchema.parse({ balance: stakedLPBalance });

			return { lpBalance: lpBalanceResponse.balance, stakedLPBalance: stakedLPBalanceResponse.balance };
		},
		staleTime: fiveMinute,
	});
}
