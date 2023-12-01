import { oneHour } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { BalanceSchema } from '~/schema/balance';

export function useCompanyBalance() {
	const app = useApp();
	const lcd = useLCDClient();

	return useQuery({
		queryKey: queryKeys.balanceOrne(app.contract.company),
		queryFn: async () => {
			const response = await lcd.wasm.contractQuery(app.contract.token, {
				balance: { address: app.contract.company },
			});

			return BalanceSchema.parse(response);
		},
		staleTime: oneHour,
	});
}
