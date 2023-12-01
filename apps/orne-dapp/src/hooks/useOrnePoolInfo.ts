import { fiveMinute } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { Dec } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';

export function useOrnePoolInfo() {
	const app = useApp();
	const lcd = useLCDClient();

	return useQuery({
		queryKey: queryKeys.poolInfo(app.contract.orneLunaPair),
		queryFn: async () => {
			const msg = { pool: {} };

			return lcd.wasm.contractQuery(app.contract.orneLunaPair, msg).then((response) => {
				const orne = response.assets.find((a) => 'token' in a.info);
				const luna = response.assets.find((a) => 'native_token' in a.info);

				return {
					orne_price: new Dec(luna.amount).dividedBy(orne.amount).toFixed(10),
					orne: new Dec(orne.amount).toString(),
					luna: new Dec(luna.amount).toString(),
				};
			});
		},
		staleTime: fiveMinute,
	});
}
