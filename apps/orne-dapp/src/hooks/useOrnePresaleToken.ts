import { oneMinute } from '@orne/utils/src/time';
import { useQuery } from '@tanstack/react-query';
import { LCDClient } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { type TalisToken, TalisTokensSchema } from '~/schema/tokens';

export function useOrnePresaleToken() {
	const app = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	if (!connectedWallet) {
		throw new Error("Can't get presale tokens without connected wallet");
	}

	return useQuery({
		queryKey: queryKeys.presaleTokens(connectedWallet.terraAddress),
		queryFn: async () => {
			const tokens = await fetchTalisTokens({
				lcd,
				contractAddress: app.contract.presale,
				ownerAddress: connectedWallet.terraAddress,
			});

			return Promise.all(
				tokens.map((tokenInfo) => {
					return fetch(tokenInfo.metadata_uri).then((r) => r.json());
				})
			);
		},
		staleTime: oneMinute,
	});
}

interface FetchTalisTokensParams {
	lcd: LCDClient;
	contractAddress: string;
	ownerAddress: string;
}

async function fetchTalisTokens(params: FetchTalisTokensParams, data: TalisToken[] = []) {
	const { lcd, contractAddress, ownerAddress } = params;

	const msg =
		data.length > 0
			? { tokens: { owner: ownerAddress, limit: 30, start_after: data.at(-1)?.token_id, verbose: true } }
			: { tokens: { owner: ownerAddress, limit: 30, verbose: true } };

	const response = await lcd.wasm.contractQuery(contractAddress, msg);
	const parsedResponse = TalisTokensSchema.parse(response);

	if (parsedResponse.tokens.length > 0) {
		data.push(...parsedResponse.tokens);
		await fetchTalisTokens(params, data);
	}

	return data;
}
