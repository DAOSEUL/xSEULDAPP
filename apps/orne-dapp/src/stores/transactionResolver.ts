import { create } from 'zustand';
import type { TxResult } from '@terra-money/wallet-provider';

interface PendingTransaction {
	txResult: TxResult;
	callback?: (tx: TxResult) => void;
}

interface TransactionResolverState {
	transactions: PendingTransaction[];
	push: (transaction: PendingTransaction) => void;
	remove: (txHash: string) => void;
}

export const useTransactionResolver = create<TransactionResolverState>((set) => ({
	transactions: [],

	push(transaction: PendingTransaction) {
		set((state) => ({
			transactions: [...state.transactions, transaction],
		}));
	},

	remove(txHash: string) {
		set((state) => ({
			transactions: state.transactions.filter((tx) => tx.txResult.result.txhash !== txHash),
		}));
	},
}));
