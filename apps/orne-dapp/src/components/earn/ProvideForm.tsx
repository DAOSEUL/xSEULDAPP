import { string } from '@orne/utils';
import { Dec } from '@terra-money/feather.js';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDebounce } from 'use-debounce';
import { AmountInput } from '~/components/form/AmountInput';
import { useOrneBalance } from '~/hooks/useOrneBalance';
import { useLPBalance } from '~/hooks/useLPBalance';
import { useWithdrawLiquidity } from '~/hooks/useWithdrawLiquiditys';
import { readAmounts } from '~/utils/readAmounts';
import { Button } from '../ui/Button';

export function ProvideForm() {
  const { data: orneBalance } = useOrneBalance();
  const { data: balance, isLoading: isLoadingBalance } = useLPBalance();

  const [amount, setAmount] = useState('');
  const [debouncedAmount] = useDebounce(amount, 700);
  const { mutate: withdraw } = useWithdrawLiquidity();

  const handleMaxClick = () => {
    if (orneBalance && balance) {
      setAmount(readAmounts(balance.lpBalance));
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
        <h2 className="text-3xl font-semibold text-sky-500"> {/* Updated text color */}
          {/*Mint <span className="text-green">xSEUL</span>*/}
        </h2>
        <button
          type="button" // Ensure it's a button, not a form submission button
          className="border-sky-500 bg-slate-90025 hover:bg-slate-900 flex h-7 items-center justify-center rounded-lg border px-3 font-semibold transition-colors hover:text-sky-500"
          onClick={handleMaxClick}
        >
          Max
        </button>
      </div>

      <div className="mb-10 flex flex-col items-center gap-8">
        <div className="w-full flex-1">
          <div className="bg-slate-900 flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm"> {/* Updated background color */}
            <div className="flex w-full justify-between">
              <span className="text-sky-500 mb-3">Balance SEUL 》》》</span> {/* Updated text color */}
              <div className="-mt-2 flex items-center gap-2">
                <span className="text-sky-500"> {/* Updated text color */}
                  {isLoadingBalance ? (
                    <ThreeDots color="hsl(203,23%,42%)" height="10" />
                  ) : (
                    readAmounts(balance?.lpBalance)
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <AmountInput className="bg-slate-900 text-2xl font-semibold text-sky-500" value={amount} onChange={setAmount} /> {/* Updated background and text color */}
            </div>
          </div>
        </div>
      </div>

      <Button className="mb-14" onClick={handleSubmit}>
        Mint xSEUL
      </Button>
    </>
  );
}
