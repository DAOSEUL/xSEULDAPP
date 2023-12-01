import * as net from 'net';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dec, MsgExecuteContract } from '@terra-money/feather.js';
import { queryKeys } from '~/hooks/queryKeys';
import { useApp } from '~/hooks/useApp';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { useTerraNetwork } from '~/hooks/useTerraNetwork';
import { useTransactionResolver } from '~/stores/transactionResolver';

interface WithdrawLiquidityParams {
	amount: Dec;
}

export function useWithdrawLiquidity() {
	const app = useApp();
	const network = useTerraNetwork();
	const connectedWallet = useConnectedWallet();
	const queryClient = useQueryClient();
	const push = useTransactionResolver((state) => state.push);

	if (!connectedWallet || !network) {
		throw new Error('useWithdrawLiquidity must be used within a connected wallet and network context');
	}

	return useMutation({
		mutationFn: async (params: WithdrawLiquidityParams) => {
			const amount = params.amount.times(1_000_000).toString();

			const unstakeMsg = new MsgExecuteContract(connectedWallet.terraAddress, app.contract.astroGenerator, {
				withdraw: {
					amount,
					lp_token: app.contract.lp,
				},
			});

			const withdrawMsg = new MsgExecuteContract(connectedWallet.terraAddress, app.contract.lp, {
				send: {
					amount,
					contract: app.contract.orneLunaPair,
					msg: 'eyJ3aXRoZHJhd19saXF1aWRpdHkiOnt9fQ',
				},
			});

			const tx = await connectedWallet.post({
				chainID: network.chainID,
				gasAdjustment: '1.6',
				gasPrices: '0.456uusd',
				feeDenoms: ['uusd'],
				msgs: [unstakeMsg, withdrawMsg],
			});

			push({
				txResult: tx,
				callback() {
					void queryClient.invalidateQueries(queryKeys.poolRoot);
					void queryClient.invalidateQueries(queryKeys.balanceRoot);
				},
			});
		},
	});
}
