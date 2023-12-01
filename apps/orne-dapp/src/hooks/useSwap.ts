import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Coin, Dec, MsgExecuteContract } from '@terra-money/feather.js';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { useTerraNetwork } from '~/hooks/useTerraNetwork';
import { useTransactionResolver } from '~/stores/transactionResolver';

export type SwapParams = { slippage: string; beliefPrice: string } & (SwapLunaParams | SwapOrneParams);
type SwapLunaParams = { amountLuna: string };
type SwapOrneParams = { amountOrne: string };

export function useSwap() {
	const app = useApp();
	const network = useTerraNetwork();
	const queryClient = useQueryClient();
	const connectedWallet = useConnectedWallet();
	const push = useTransactionResolver((state) => state.push);

	if (!connectedWallet || !network) {
		throw new Error('useSwap must be used within a connected wallet and network context');
	}

	return useMutation({
		mutationFn: async (params: SwapParams) => {
			const msg =
				'amountLuna' in params
					? computeSwapLunaToOrneMessage(connectedWallet.terraAddress, app.contract.orneLunaPair, params)
					: computeSwapOrneToLunaMessage(
							connectedWallet.terraAddress,
							[app.contract.orneLunaPair, app.contract.token],
							params
					  );

			const tx = await connectedWallet!.post({
				chainID: network.chainID,
				feeDenoms: ['uluna'],
				gasAdjustment: 1.6,
				gasPrices: { uluna: '0.015' },
				msgs: [msg],
			});

			push({
				txResult: tx,
				callback() {
					void queryClient.invalidateQueries(queryKeys.balanceRoot);
				},
			});
		},
	});
}

function computeSwapLunaToOrneMessage(
	address: string,
	contract: string,
	params: SwapLunaParams & { slippage: string; beliefPrice: string }
) {
	const query = computeSwapLunaToOrneQuery({
		amount: params.amountLuna,
		slippage: params.slippage,
		beliefPrice: params.beliefPrice,
	});

	return new MsgExecuteContract(address, contract, query, [
		new Coin('ibc/CBF67A2BCF6CAE343FDF251E510C8E18C361FC02B23430C121116E0811835DEF', new Dec(params.amountLuna).times(1_000_000)),
	]);
}

function computeSwapOrneToLunaMessage(
	address: string,
	contracts: string[],
	params: SwapOrneParams & { slippage: string; beliefPrice: string }
) {
	const query = computeSwapOrneToLunaQuery({
		contract: contracts[0],
		amount: params.amountOrne,
		slippage: params.slippage,
		beliefPrice: params.beliefPrice,
	});

	return new MsgExecuteContract(address, contracts[1], query);
}

type SwapMessageParams = { amount: string; slippage: string; beliefPrice?: string };
export function computeSwapLunaToOrneQuery(params: SwapMessageParams) {
	return {
		swap: {
			...(params.beliefPrice ? { belief_price: params.beliefPrice } : {}),
			max_spread: new Dec(params.slippage).dividedBy(100).toString(),
			offer_asset: {
				amount: new Dec(params.amount).times(1_000_000).toString(),
				info: {
					native_token: {
						denom: 'ibc/CBF67A2BCF6CAE343FDF251E510C8E18C361FC02B23430C121116E0811835DEF',
					},
				},
			},
		},
	};
}
export function computeSwapOrneToLunaQuery(params: SwapMessageParams & { contract: string }) {
	return {
		send: {
			amount: new Dec(params.amount).times(1_000_000).toString(),
			contract: params.contract,
			msg: btoa(
				JSON.stringify({
					swap: {
						...(params.beliefPrice ? { belief_price: params.beliefPrice } : {}),
						max_spread: new Dec(params.slippage).dividedBy(100).toString(),
					},
				})
			),
		},
	};
}
