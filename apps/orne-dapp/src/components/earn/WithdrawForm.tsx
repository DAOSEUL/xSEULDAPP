import { string } from '@orne/utils';
import { Dec } from '@terra-money/feather.js';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDebounce } from 'use-debounce';
import swapCurrency from '~/assets/swap-currency.svg';
import { AmountInput } from '~/components/form/AmountInput';
import { useOrneBalance } from '~/hooks/useOrneBalance';
import { useLPBalance } from '~/hooks/useLPBalance';
import { useShare } from '~/hooks/useShare';
import { useWithdrawLiquidity } from '~/hooks/useWithdrawLiquidity';
import { Token } from '~/utils/constants';
import { readAmounts } from '~/utils/readAmounts';
import { Button } from '../ui/Button';
import { IconToken } from '../ui/IconToken';

export function WithdrawForm() {
	const { data: orneBalance, isLoading: isLoadingOrneBalance } = useOrneBalance();
  const { data: balance, isLoading: isLoadingBalance } = useLPBalance();
	
	const [amount, setAmount] = useState('');
	const [debouncedAmount] = useDebounce(amount, 700);
	const { data: withdrawing, isLoading: isLoadingShare } = useShare(+debouncedAmount);
	const { mutate: withdraw } = useWithdrawLiquidity();

	const handleMaxClick = () => {
		if (orneBalance) {
			setAmount(readAmounts(orneBalance?.balance));
		}
	};

	function handleSubmit() {
		withdraw(
			{ amount: new Dec(string.transformToValidInput(debouncedAmount)) },
			{
				onSuccess() {
					setAmount('');
				},
			}
		);
	}

	return (
		<>
			<div className="mb-5 flex items-center gap-2">
				<h2 className="text-3xl font-semibold">
					{/*Burn <span className="text-sky-500">xSEUL</span> */}
				</h2>
				<button
					type="button"
					className="border-sky-500 bg-slate-90025 hover:bg-slate-900 flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-white"
					onClick={handleMaxClick}
				>
					Max
				</button>
			</div>

			<div className="mb-10 flex flex-col items-center gap-8">
				<div className="w-full flex-1">
					<div className="bg-slate-900 flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
						<div className="flex w-full justify-between">
							<span className="text-sky-500 mb-3">Balance</span>
							<div className="-mt-2 flex items-center gap-2">
								<span className="text-sky-500">
									{isLoadingOrneBalance ? (
										<ThreeDots color="hsl(203,23%,42%)" height="10" />
									) : (
										readAmounts(orneBalance?.balance)
									)}
								</span>
							</div>
						</div>
						<div className="flex justify-between">
							<AmountInput className="bg-slate-900 text-sky-500 font-semibold" value={amount} onChange={setAmount} />
							{/* Removed columns for ORNE and LUNA */}
						</div>
					</div>
				</div>

				{/* Removed "Swap currency" section */}

				{/* Removed columns for ORNE and LUNA */}
			</div>

			<Button className="mb-14" onClick={handleSubmit}>
				Burn xSEUL
			</Button>
		</>
	);
};
