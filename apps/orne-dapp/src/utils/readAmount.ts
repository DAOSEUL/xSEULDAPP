import { Dec } from '@terra-money/feather.js';

interface ReadAmountOptions {
	micro?: boolean;
}
export function readAmount(amount: string | null | undefined, options?: ReadAmountOptions) {
	const { micro = true } = options || {};

	if (!amount) return 0;

	const value = micro ? new Dec(amount).dividedBy(1_000_000) : new Dec(amount);

	return new Intl.NumberFormat('en-US').format(Number(value.toFixed(0)));
}
