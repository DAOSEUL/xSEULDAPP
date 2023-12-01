import { Big, type BigSource } from 'big.js';
import { u } from '@orne/types';
export function demicrofy(amount: u<BigSource>, decimals: number): Big {
	return new Big(amount).div(Math.pow(10, decimals));
}
