import { tx } from '@orne/utils';
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { useTerraNetwork } from '~/hooks/useTerraNetwork';
import { useTransactionResolver } from '~/stores/transactionResolver';

export function PendingTransaction() {
	const connectedWallet = useConnectedWallet();
	const network = useTerraNetwork();
	const transactions = useTransactionResolver((state) => state.transactions);
	const removeTransaction = useTransactionResolver((state) => state.remove);

	if (!network || !connectedWallet) {
		throw new Error('Network or connected wallet is not available');
	}

	useEffect(() => {
		for (const { txResult, callback } of transactions) {
			//? Wait for 5 seconds before checking the transaction status
			//? since Cloudflare Cache has bad configuration on TFL side
			setTimeout(() => {
				tx.fetchTransactionStatus(network.networkInfo.lcd, txResult.result.txhash).then(() => {
					removeTransaction(txResult.result.txhash);

					if (callback) {
						//? Wait for 1 second since the LCD seems to lag behind
						setTimeout(() => {
							callback(txResult);
						}, 1000);
					}
				});
			}, 5000);
		}
	}, [transactions]);

	if (!transactions.length) {
		return <></>;
	}

	return (
		<div className="bg-green25 flex items-center justify-center gap-2 rounded-full py-1 px-2">
			<Oval
				ariaLabel="loading-indicator"
				height={20}
				width={20}
				strokeWidth={5}
				color="hsl(203,23%,42%)"
				secondaryColor="white"
			/>

			<p className="text-sm">Pending Transaction...</p>
		</div>
	);
}
