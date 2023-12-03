import { ThreeDots } from 'react-loader-spinner';
import { useLPBalance } from '~/hooks/useLPBalance';
import { useOrneBalance } from '~/hooks/useOrneBalances';
import { readAmounts } from '~/utils/readAmounts';
import { readAmounts } from '~/utils/readAmounts';

export function PoolStakedToken() {
	const { data: balance, isLoading: isLoadingBalance } = useLPBalance();
  const orneBalance = useOrneBalance();
	return (
		<div className="flex flex-col gap-2">
			<span className="text-darkBlue50">My Balance</span>
			<div className="relative flex flex-col">
				{isLoadingBalance ? (
					<ThreeDots color="hsl(203,23%,42%)" height="10" />
				) : (
					<>
						<span className="text-2xl font-semibold">
							~{readAmounts(orneBalance.data?.balance)} <span className="text-base font-normal">SEUL</span>
						</span>
						<span className="text-2xl font-semibold absolute -bottom-5 right-0 w-max text-sm">
							+ {readAmounts(balance?.lpBalance)} xSEUL
						</span>
					</>
				)}
			</div>
		</div>
	);
}
