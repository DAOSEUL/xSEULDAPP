import { string } from '@orne/utils';
import { Dec } from '@terra-money/feather.js';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDebounce } from 'use-debounce';
import { AmountInput } from '~/components/form/AmountInput';
import { useOrneBalance } from '~/hooks/useOrneBalance';
import { useWithdrawLiquidity } from '~/hooks/useWithdrawLiquiditys';
import { readAmounts } from '~/utils/readAmounts';
import { Button } from '../ui/Button';

export function ProvideForm() {
  const orneBalance = useOrneBalance();
	
  const [amount, setAmount] = useState('');
  const [debouncedAmount] = useDebounce(amount, 700);
  const { mutate: withdraw } = useWithdrawLiquidity();

  function handleSubmit() {
    withdraw(
      { amount: new Dec(string.transformToValidInput(amount)) },
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
          Mint <span className="text-green">xSEUL</span>
        </h2>
      </div>

      <div className="mb-10 flex flex-col items-center gap-8">
        <div className="w-full flex-1">
          <div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
            <div className="flex w-full justify-between">
              <span className="text-darkBlue50 mb-3">Balance</span>
              <div className="-mt-2 flex items-center gap-2">
                <span className="text-darkBlue50">
                  {orneBalance.isLoading ? (
                    <ThreeDots color="hsl(203,23%,42%)" height="10" />
                  ) : (
                    readAmounts(orneBalance.data?.balance)
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <AmountInput className="bg-offWhite text-2xl font-semibold" value={amount} onChange={setAmount} />
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
