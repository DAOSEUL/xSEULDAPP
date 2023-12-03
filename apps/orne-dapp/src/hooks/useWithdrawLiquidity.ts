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

			const unstakeMsg = new MsgExecuteContract(connectedWallet.terraAddress, 'terra1q328gl40az3cf9x67cgudn8e8w2az9vsmhtkwsgdu7a43rhy5caqc82yr5', {
        send: {
          contract: 'terra1chx8lsvhhutec2es64062r03zj3gfhkqvqy46nxarzuy5tlyztasehwpys',
          amount: params.amount.times(1_000_000).toString(),
          msg: 'eyJsZWF2ZSI6e319',
        },
      });
			
			const tx = await connectedWallet.post({
				chainID: network.chainID,
				gasAdjustment: '1.6',
				gasPrices: '0.456uusd',
				feeDenoms: ['uusd'],
				msgs: [unstakeMsg],
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
