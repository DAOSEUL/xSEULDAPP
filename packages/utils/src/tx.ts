import { sleep } from './common';

export async function fetchTransactionStatus(endpoint: string, txHash: string): Promise<any> {
	const url = `${endpoint}/txs/${txHash}`;
	const response = await fetch(url, {
		cache: 'no-cache',
	});

	if (!response.ok) {
		await sleep(2);
		return fetchTransactionStatus(endpoint, txHash);
	}

	return response;
}
