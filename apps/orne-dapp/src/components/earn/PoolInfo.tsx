import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { ThreeDots } from 'react-loader-spinner';
import { PoolStakedToken } from '~/components/earn/PoolStakedToken';
import { IconToken } from '~/components/ui/IconToken';
import { useOrneTokenData } from '~/hooks/useOrneTokenData';
import { useOrnePoolInfo } from '~/hooks/useOrnePoolInfo';
import { Token } from '~/utils/constants';
import { readAmounts } from '~/utils/readAmounts';
import { readPercent } from '~/utils/readPercent';

export function PoolInfo() {
	const { status } = useWallet();
	const { APR, ornePriceInUSD, isLoading } = useOrneTokenData();
	const ornePoolInfo = useOrnePoolInfo();

	return (
		<div className="bg-slate-900 flex flex-1 flex-col justify-between gap-10 rounded-lg p-8 pb-14 shadow-sm lg:flex-row lg:items-center lg:pb-8">
			<div className="flex flex-col">
				<span className="mb-2 text-sky-500 font-semibold">xSEUL / axlUSDT</span>
				<div className="flex gap-2">
					<IconToken name={Token.Orne} size={36} />
					<IconToken name={Token.Luna} size={36} />
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-sky-500">APR</span>
				<span className="text-sky-500 font-semibold">
					{isLoading ? <ThreeDots color="hsl(203,23%,42%)" height="10" /> : `${readPercent(APR)}%`}
				</span>
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-sky-500">Liquidity</span>
				<span className="text-sky-500 font-semibold">
					<span className="text-base">$</span>{' '}
					{isLoading ? <ThreeDots color="hsl(203,23%,42%)" height="10" /> : readAmounts(ornePoolInfo.data!.luna * 2, { decimals: 6, comma: true, fixed: 3 })}
				</span>
			</div>
			{status !== WalletStatus.WALLET_CONNECTED && <span>Connect your wallet to see your info</span>}
			{status === WalletStatus.WALLET_CONNECTED && <PoolStakedToken />}
		</div>
	);
}
