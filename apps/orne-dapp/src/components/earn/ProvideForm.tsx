import { string } from '@orne/utils';
import { Dec } from '@terra-money/feather.js';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDebouncedCallback } from 'use-debounce';
import plusCurrency from '~/assets/plus-currency.svg';
import { AmountInput } from '~/components/form/AmountInput';
import { useLunaBalance } from '~/hooks/useLunaBalance';
import { useOrneBalance } from '~/hooks/useOrneBalance';
import { useProvideLiquidity } from '~/hooks/useProvideLiquidity';
import { useSwapSimulation } from '~/hooks/useSwapSimulation';
import { Token } from '~/utils/constants';
import { readAmount } from '~/utils/readAmount';
import { readAmounts } from '~/utils/readAmounts';
import { Button } from '../ui/Button';
import { IconToken } from '../ui/IconToken';

export function ProvideForm() {
    const { data: orneBalance, isLoading: isLoadingOrneBalance } = useOrneBalance();
    const { data: lunaBalance, isLoading: isLoadingLunaBalance } = useLunaBalance();

    const { mutate: provide } = useProvideLiquidity();
    const { mutateAsync: simulate } = useSwapSimulation();

    const [amountOrne, setAmountOrne] = useState<string>('');
    const [amountLuna, setAmountLuna] = useState<string>('');

    const [fetchingOrne, setFetchingOrne] = useState(false);
    const computeOrneReturns = useDebouncedCallback(async (amount: string) => {
        setFetchingOrne(true);
        const estimatedReturn = await simulate({ amount, token: Token.Luna }).then(
            ({ return_amount, spread_amount, commission_amount }) =>
                new Dec(return_amount).plus(spread_amount).plus(commission_amount)
        );

        if (amountLuna) {
            setAmountOrne(readAmounts(estimatedReturn));
        }

        setFetchingOrne(false);
    }, 700);

    const [fetchingLuna, setFetchingLuna] = useState(false);
    const computeLunaReturns = useDebouncedCallback(async (amount: string) => {
        setFetchingLuna(true);

        const estimatedReturn = await simulate({ amount, token: Token.Orne }).then(
            ({ return_amount, spread_amount, commission_amount }) =>
                new Dec(return_amount).plus(spread_amount).plus(commission_amount)
        );

        if (amountOrne) {
            setAmountLuna(readAmounts(estimatedReturn));
        }
        setFetchingLuna(false);
    }, 700);

    async function handleLunaAmountChange(amount: string) {
        setAmountLuna(amount);

        if (!amount) {
            setAmountOrne('');
            return;
        }

        await computeOrneReturns(amount);
    }

    async function handleOrneAmountChange(amount: string) {
        setAmountOrne(amount);

        if (!amount) {
            setAmountLuna('');
            return;
        }

        await computeLunaReturns(amount);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!amountOrne || !amountLuna) return;

        await provide(
            {
                amountLuna: new Dec(string.transformToValidInput(amountLuna)),
                amountOrne: new Dec(string.transformToValidInput(amountOrne)),
            },
            {
                onSuccess() {
                    setAmountOrne('');
                    setAmountLuna('');
                },
            }
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-5 flex items-center gap-2">
                    <h2 className="text-3xl font-semibold">
                        Add Liquidity <span className="text-green">axlUSDT-xSEUL</span>
                    </h2>
                </div>
                <div className="mb-10 flex flex-col gap-8 lg:flex-row">
                    <div className="flex-1">
                        <div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
                            <div className="flex w-full justify-between">
                                <span className="text-darkBlue50 mb-3">Balance</span>
                                <span className="text-darkBlue50 mb-3">
                                    {isLoadingLunaBalance ? (
                                        <ThreeDots color="hsl(203,23%,42%)" height="10" />
                                    ) : (
                                        readAmounts(lunaBalance?.balance)
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                {fetchingLuna ? (
                                    <div className="flex items-center">
                                        <ThreeDots color="hsl(203,23%,42%)" height="10" />
                                    </div>
                                ) : (
                                    <AmountInput
                                        className="bg-offWhite text-2xl font-semibold"
                                        placeholder="0"
                                        value={amountLuna}
                                        onChange={handleLunaAmountChange}
                                    />
                                )}
                                <div className="flex items-center gap-2">
                                    <IconToken name={Token.Luna} size={36} />
                                    <span className="text-mediumGrey">axlUSDT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center...">
                        {/* Bagian tengah komponen */}
                    </div>
                    <div className="flex-1">
                        <div className="bg-offWhite flex h-32 flex-1 flex-col justify-center rounded-lg p-8 shadow-sm">
                            <div className="flex w-full justify-between">
                                <span className="text-darkBlue50 mb-3">Balance</span>
                                <span className="text-darkBlue50 mb-3">
                                    {isLoadingOrneBalance ? (
                                        <ThreeDots color="hsl(203,23%,42%)" height="10" />
                                    ) : (
                                        readAmounts(orneBalance?.balance)
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                {fetchingOrne ? (
                                    <div className="flex items-center">
                                        <ThreeDots color="hsl(203,23%,42%)" height="10" />
                                    </div>
                                ) : (
                                    <AmountInput
                                        className="bg-offWhite text-2xl font-semibold"
                                        placeholder="0"
                                        value={amountOrne}
                                        onChange={handleOrneAmountChange}
                                    />
                                )}
                                <div className="flex items-center gap-2">
                                    <IconToken name={Token.Orne} size={36} />
                                    <span className="text-mediumGrey">xSEUL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button className="mb-14" type="submit">
                    Stake uLP
                </Button>
            </form>
        </>
    );
}
