import { oneMinute } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { Dec } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { splitBy } from '~/utils/splitBy';

export function useLunaPoolInfo() {
	const app = useApp();
	const lcd = useLCDClient();

	return useQuery({
		queryKey: queryKeys.poolInfo(app.contract.lunaUsdcPair),
		queryFn: async () => {
			const msg = { pool: {} };

			return lcd.wasm.contractQuery(app.contract.lunaUsdcPair, msg).then((response) => {
				const [[luna], [usdc]] = splitBy(response.assets, (item) => item.info.native_token?.denom === 'uluna');

				return {
					luna_price: new Dec(usdc.amount).dividedBy(luna.amount).toFixed(3),
					usdc: new Dec(usdc.amount).toString(),
					luna: new Dec(luna.amount).toString(),
				};
			});
		},
		staleTime: oneMinute,
	});
}
