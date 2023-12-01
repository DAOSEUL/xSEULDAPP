import { useMutation } from '@tanstack/react-query';
import { Coin, Dec, MsgExecuteContract } from '@terra-money/feather.js';
import { useLCDClient } from '@terra-money/wallet-provider';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { computeSwapLunaToOrneQuery, computeSwapOrneToLunaQuery } from '~/hooks/useSwap';
import { Token } from '~/utils/constants';

type SwapParams = { amount: string; token: Token; slippage: number };

// Luna to Orne
// {
// 	"swap": {
// 	"offer_asset": {
// 		"info": {
// 			"native_token": {
// 				"denom": "uluna"
// 			}
// 		},
// 		"amount": "10000000"
// 	},
// 	"max_spread": "0.005",
// 		"belief_price": "0.012186657826920047"
// 	}
// }

// Orne to Luna
// {
// 	"send": {
// 	"amount": "10000000",
// 		"contract": "terra1h4cakgms4ju3eryhrmw00xegtjxkgyv88yqllg9ryz9qxek4qz9sz3swn2",
// 		"msg": "eyJzd2FwIjp7Im1heF9zcHJlYWQiOiIwLjAwNSIsImJlbGllZl9wcmljZSI6IjgyLjY5NzI1MzYyNDIwNzE0MDA4MCJ9fQ=="
// 	}
// }
//
// {"swap":{"max_spread":"0.005","belief_price":"82.697253624207140080"}}

export function useEstimateFee() {
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();
	const { contract } = useApp();

	return useMutation({
		mutationFn: async (params: SwapParams) => {
			if (!connectedWallet) return;

			const query =
				params.token === Token.Luna
					? computeSwapLunaToOrneQuery({ amount: params.amount, slippage: params.slippage.toString() })
					: computeSwapOrneToLunaQuery({
							amount: params.amount,
							slippage: params.slippage.toString(),
							contract: contract.token,
					  });

			const coins =
				params.token === Token.Luna
					? [new Coin('uluna', new Dec(params.amount).times(1_000_000).toString())]
					: undefined;

			const msg = new MsgExecuteContract(connectedWallet.terraAddress, contract.orneLunaPair, query, coins);
			const accountInfo = await lcd.auth.accountInfo(connectedWallet.terraAddress);

			return await lcd.tx.estimateFee(
				[
					{
						publicKey: accountInfo.getPublicKey(),
						sequenceNumber: accountInfo.getSequenceNumber(),
					},
				],
				{
					chainID: 'pisco-1',
					feeDenoms: ['uluna'],
					gasAdjustment: 1.6,
					gasPrices: { uluna: '0.015' },
					msgs: [msg],
				}
			);
		},
	});
}
