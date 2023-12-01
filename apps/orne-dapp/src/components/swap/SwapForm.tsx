import { Dec, Fee } from '@terra-money/feather.js';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDebounce } from 'use-debounce';
import swapCurrency from '~/assets/swap-currency.svg';
import { AmountInput } from '~/components/form/AmountInput';
import { SlippageSelector } from '~/components/form/SlippageSelector';
import { Button } from '~/components/ui/Button';
import { IconToken } from '~/components/ui/IconToken';
import { useEstimateFee } from '~/hooks/useEstimateFee';
import { useLunaBalance } from '~/hooks/useLunaBalance';
import { useOrneBalance } from '~/hooks/useOrneBalance';
import { SwapParams, useSwap } from '~/hooks/useSwap';
import { useSwapSimulation } from '~/hooks/useSwapSimulation';
import { Token } from '~/utils/constants';
import { readAmounts } from '~/utils/readAmounts';
import { readAmounts } from '~/utils/readAmounts';

export function SwapForm() {
	const { data: orneBalance, isLoading: isLoadingOrneBalance } = useOrneBalance();
	const { data: lunaBalance, isLoading: isLoadingLunaBalance } = useLunaBalance();
	const [amount, setAmount] = useState('');
	const [debouncedAmount] = useDebounce(amount, 300);
	const [slippage, setSlippage] = useState(0.5);
	const [debouncedSlippage] = useDebounce(slippage, 300);
	const [simulated, setSimulated] = useState('0');
	const [fee, setFee] = useState<Fee>();
	const [[from, to], setDirection] = useState([Token.Luna, Token.Orne]);
	const { mutate: swapToken } = useSwap();
	const { mutateAsync: simulateSwap, isLoading: isSimulating } = useSwapSimulation();
	const { mutateAsync: estimateFee, isLoading: isEstimating, isError, error } = useEstimateFee();

	function changeDirection() {
		setDirection([to, from]);
	}

	useEffect(() => {
		if (!debouncedAmount) return;

		simulateSwap({ amount: debouncedAmount, token: from }).then((simulation) => {
			setSimulated(simulation.return_amount);
		});

		estimateFee({ amount: debouncedAmount, token: from, slippage: debouncedSlippage }).then((fee) => {
			setFee(fee);
		});
	}, [debouncedAmount, from, to, debouncedSlippage]);

	const pricePerToken =
		amount && simulated !== '0' ? new Dec(amount).times(1_000_000).dividedBy(simulated).toFixed(6) : 0;

	const feePrice = readAmounts(fee?.amount?.get('uluna')?.amount) || '0';

	function sendSwapTransaction() {
		const transactionParams = {
			beliefPrice: pricePerToken.toString(),
			slippage: debouncedSlippage.toString(),
		} satisfies Omit<SwapParams, 'amountLuna' | 'amountOrne'>;

		if (from === Token.Luna) {
			swapToken({ ...transactionParams, amountLuna: debouncedAmount });
		} else {
			swapToken({ ...transactionParams, amountOrne: debouncedAmount });
		}
	}

	const swapTokenBalance = from === Token.Luna ? lunaBalance?.balance : orneBalance?.balance;

	return (
		<>
			<div className="flex-1">
				<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
					<div className="flex w-full justify-between">
						<span className="text-darkBlue50 mb-3">Balance</span>
						<span className="text-darkBlue50 mb-3">
							{isLoadingOrneBalance || isLoadingLunaBalance ? (
								<ThreeDots color="hsl(203,23%,42%)" height="10" />
							) : (
								readAmounts(swapTokenBalance)
							)}
						</span>
					</div>
					<div className="flex justify-between">
						<AmountInput
							className="bg-offWhite text-2xl font-semibold"
							placeholder="0"
							value={amount}
							onChange={setAmount}
						/>
						<div className="flex items-center gap-2">
							<IconToken name={from} size={36} />
							<span className="text-mediumGrey">axlUSDT</span>
						</div>
					</div>
				</div>

				<div className="p-5">
					<dl className="space-y-2">
						<div className="flex items-center justify-between">
							<dt className="font-semibold">1 $Seul</dt>
							<dd className="text-mediumGrey inline-flex items-center">
								{isSimulating ? <ThreeDots color="hsl(203,23%,42%)" height="10" /> : pricePerToken} axlUSDT
							</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="font-semibold">Tx Fee</dt>
							<dd className="text-mediumGrey inline-flex items-center">
								{isEstimating ? <ThreeDots color="hsl(203,23%,42%)" height="10" /> : feePrice} Luna
							</dd>
						</div>
					</dl>
				</div>
			</div>

			{/* Change Direction */}
			<div className="-mt-10 flex items-center justify-center lg:mt-0 lg:h-32">
				<button className="block h-[60px] w-[60px] rounded-full shadow-lg" onClick={changeDirection}>
					<img src={swapCurrency} alt="Swap currency" />
				</button>
			</div>
			{/* To Input */}
			<div className="flex-1">
				<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
					<span className="text-darkBlue50 mb-3">Estimated</span>
					<div className="flex justify-between">
						<span className="inline-flex items-center text-2xl font-semibold">
							{isSimulating ? <ThreeDots color="hsl(203,23%,42%)" height="10" /> : readAmounts(simulated)}
						</span>
						<div className="flex items-center gap-2">
							<IconToken name={to} size={36} />
							<span className="text-mediumGrey">SEUL</span>
						</div>
					</div>
				</div>

				<div className="p-5">
					<SlippageSelector slippage={slippage} onSlippageChange={setSlippage} />

					<Button onClick={sendSwapTransaction}>Swap</Button>

					{isError && (
						<span className="text-red mt-2">
							{error?.response?.data.code === 2 ? 'Please, increase your slippage' : ''}
						</span>
					)}
				</div>
			</div>
		</>
	);
}
