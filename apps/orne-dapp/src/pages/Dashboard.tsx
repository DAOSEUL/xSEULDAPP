import { ThreeDots } from 'react-loader-spinner';
import { Icon } from '~/components/ui/Icon';
import { IconToken } from '~/components/ui/IconToken';
import Tooltip from '~/components/ui/Tooltip';
import { useOrnePoolInfo } from '~/hooks/useOrnePoolInfo';
import { useOrneTokenData } from '~/hooks/useOrneTokenData';
import { Token } from '~/utils/constants';
import { readAmounts } from '~/utils/readAmounts';
import { readAmounts } from '~/utils/readAmounts';
import { readPercent } from '~/utils/readPercent';

export function Dashboard() {
	const ornePoolInfo = useOrnePoolInfo();

	const { APR, ornePriceInUSD, totalLiquidity, fullyDilutedValue, marketCap, isLoading } = useOrneTokenData();

	return (
		<div className="mt-5 lg:-mt-6">
			<div className="timport { readAmounts } from '~/utils/readAmounts';ext-center lg:mb-20 lg:text-left">
				<h1 className="mb-5 text-5xl font-bold">
					SEUL<span className="dashboard-underline">dashboard</span>
				</h1>
				<h2 className="text-2xl">
					All information about <span className="text-green">$SEUL</span>
				</h2>
			</div>

			{isLoading ? (
				<div className="flex justify-center">
					<ThreeDots color="hsl(203,23%,42%)" height="30" />
				</div>
			) : (
				<>
					<div className="mb-20 flex flex-col gap-10 xl:flex-row">
						<div className="mt-9">
							<div className="flex items-center gap-2">
								<IconToken name={Token.Orne} size={60} />
								<div className="flex flex-col">
									<span className="font-semibold">SEUL</span>
								</div>
							</div>
						</div>

						<div className="flex flex-1 flex-col gap-8">
							<div className="flex flex-1 flex-col gap-8 xl:flex-row">
								{/* Harga */}
<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg p-7 shadow-sm">
    <div className="flex items-center gap-2">
        <span className="text-darkBlue50">Price SEUL</span>
        <Tooltip
            trigger={
                <div>
                    <Icon name="info-min" />
                </div>
            }
        >
            Nilainya dihitung langsung dari cadangan pool.
        </Tooltip>
    </div>
    <div className="flex items-center gap-2">
        {ornePoolInfo.isLoading ? (
            <div>
                <ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
            </div>
        ) : (
            <div className="text-2xl font-semibold">
                {/* Hitung harga SEUL dengan membagi Pooled axlUSDT oleh Pooled SEUL */}
                {Number((ornePoolInfo.data!.luna / ornePoolInfo.data!.orne).toFixed(6))}{' '}<span className="font-normal">USD</span>{' '}
							<small className="text-sm">($)</small>
            </div>
        )}
    </div>
</div>

								{/* Market Cap */}
								<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg p-7 shadow-sm">
									<span className="text-darkBlue50">Market Cap</span>
									<div className="flex items-center gap-2">
										<span className="text-2xl font-semibold">
											{Number((ornePoolInfo.data!.luna / (ornePoolInfo.data!.orne )).toFixed(6) * 18_900_000).toLocaleString()}{' '} <span className="font-normal">$</span>
										</span>
									</div>
								</div>

								{/* FDV */}
								<div className="bg-offWhite flex h-32 flex-1 flex-col justify-center gap-2 rounded-lg p-7 shadow-sm">
									<span className="text-darkBlue50">Fully Diluted Valuation</span>
									<div className="flex items-center gap-2">
										<span className="text-2xl font-semibold">
											{Number((ornePoolInfo.data!.luna / (ornePoolInfo.data!.orne )).toFixed(6) * 21_000_000).toLocaleString()}{' '}
											<span className="font-normal">$</span>
										</span>
									</div>
								</div>
							</div>

							<div className="flex flex-1 flex-col gap-8 xl:flex-row">
								{/* Total Liquidity */}
<div className="bg-offWhite flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg p-7 shadow-sm">
    <span className="text-darkBlue50">Total Liquidity</span>
    <div className="flex items-center gap-2">
        {!totalLiquidity ? (
            <div>
                <ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
            </div>
        ) : (
            <span className="text-2xl font-semibold">
                {/* Hitung Total Liquidity dengan mengalikan ornePoolInfo.data!.luna dengan 2 */}
                {readAmounts(ornePoolInfo.data!.luna * 2,{ decimals: 6, comma: true, fixed: 3})}
						</span>
        )}
			<small className="text-sm">($)</small>
    </div>

    <div className="flex items-center justify-between">
        <div className="flex flex-col">
            <span className="text-sm font-semibold">Pooled SEUL</span>
            <div className="text-mediumGrey text-sm">
                {ornePoolInfo.isLoading ? (
                    <div>
                        <ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
                    </div>
                ) : (
                    <span className="text-mediumGrey text-sm">
                        {readAmounts(ornePoolInfo.data!.orne, { decimals: 18, comma: true, fixed: 3 })}
                    </span>
                )}
            </div>
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-semibold">Pooled axlUSDT</span>
            <span className="text-mediumGrey text-sm">
                {ornePoolInfo.isLoading ? (
                    <div>
                        <ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
                    </div>
                ) : (
                    <span className="text-mediumGrey text-sm">
                        {readAmounts(ornePoolInfo.data!.luna, { decimals: 6, comma: true, fixed: 3 })}
                    </span>
                )}
            </span>
        </div>
    </div>
</div>

								{/* Pool APR */}
								<div className="bg-offWhite flex h-44 flex-1 flex-col justify-start gap-2 rounded-lg p-7 shadow-sm">
									<div className="flex items-center gap-2">
										<span className="text-darkBlue50">Pool APR</span>
										<Tooltip
											trigger={
												<div>
													<Icon name="info-min" />
												</div>
											}
										>
											Retrieved for the Orne/Luna pool.
										</Tooltip>
									</div>

									<div className="flex items-center gap-2">
										<span className="text-2xl font-semibold">
											{readPercent(APR)} <span className="font-normal">%</span>
										</span>
									</div>
									{/*<div className="flex items-center justify-between">*/}
									{/*	<div className="flex flex-col">*/}
									{/*		<span className="text-sm font-semibold">ASTRO APR</span>*/}
									{/*		<span className="text-sm text-mediumGrey">0.56%</span>*/}
									{/*	</div>*/}
									{/*	<div className="flex flex-col">*/}
									{/*		<span className="text-sm font-semibold">ORNE APR</span>*/}
									{/*		<span className="text-sm text-mediumGrey">0.47%</span>*/}
									{/*	</div>*/}
									{/*</div>*/}
								</div>
							</div>
						</div>
					</div>

					{/*<h2 className="mb-5 text-2xl font-semibold">Your wallet</h2>*/}

					{/*<div className="mb-10 flex flex-col gap-8 xl:flex-row">*/}
					{/*	<div className="flex-1">*/}
					{/*		<div className="flex h-32 flex-1 flex-col justify-center rounded-lg bg-offWhite p-8 shadow-sm">*/}
					{/*			<div className="flex w-full justify-between">*/}
					{/*				<span className="mb-3 text-darkBlue50">Balance</span>*/}
					{/*				<span className="mb-3 text-darkBlue50">0.048429</span>*/}
					{/*			</div>*/}
					{/*			<div className="flex justify-between">*/}
					{/*				<span className="text-2xl font-semibold">1490.00</span>*/}
					{/*				<div className="flex items-center gap-2">*/}
					{/*					<IconToken name="orne" size={36} />*/}
					{/*					<span className="text-mediumGrey">ORNE</span>*/}
					{/*				</div>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*	<div className="flex-1">*/}
					{/*		<div className="flex h-32 flex-1 flex-col justify-center rounded-lg bg-offWhite p-8 shadow-sm">*/}
					{/*			<div className="flex w-full justify-between">*/}
					{/*				<span className="mb-3 text-darkBlue50">Balance</span>*/}
					{/*				<span className="mb-3 text-darkBlue50">0.048429</span>*/}
					{/*			</div>*/}
					{/*			<div className="flex justify-between">*/}
					{/*				<span className="text-2xl font-semibold">30766.618259</span>*/}
					{/*				<div className="flex items-center gap-2">*/}
					{/*					<IconToken name="luna" size={36} />*/}
					{/*					<span className="text-mediumGrey">LUNA</span>*/}
					{/*				</div>*/}
					{/*			</div>*/}
					{/*		</div>*/}
					{/*	</div>*/}
					{/*</div>*/}
				</>
			)}
		</div>
	);
}
