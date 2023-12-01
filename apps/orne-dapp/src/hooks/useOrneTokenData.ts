import { Dec } from '@terra-money/feather.js';
import { useEffect, useState } from 'react';
import { useCompanyBalance } from '~/hooks/useCompanyBalance';
import { useLunaPoolInfo } from '~/hooks/useLunaPoolInfo';
import { useOrnePoolInfo } from '~/hooks/useOrnePoolInfo';

export function useOrneTokenData() {
	const ornePoolInfo = useOrnePoolInfo();
	const lunaPoolInfo = useLunaPoolInfo();
	const companyBalance = useCompanyBalance();

	const [APR, setAPR] = useState<Dec | null>(null);
	const [totalLiquidity, setTotalLiquidity] = useState<Dec | null>(null);
	const [ornePriceInUSD, setOrnePriceInUSD] = useState<Dec | null>(null);
	const [marketCap, setMarketCap] = useState<Dec | null>(null);
	const [fullyDilutedValue, setFullyDilutedValue] = useState<Dec | null>(null);

	const isLoading = ornePoolInfo.isLoading || lunaPoolInfo.isLoading || companyBalance.isLoading;

	useEffect(() => {
		if (!(ornePoolInfo.isSuccess && lunaPoolInfo.isSuccess && companyBalance.isSuccess)) {
			return;
		}

		const { luna, orne, orne_price } = ornePoolInfo.data;

		const lunaPriceInUSD = lunaPoolInfo.data!.luna_price;
		const ornePriceInUSD = new Dec(orne_price).times(lunaPriceInUSD);
		const orneQuantity = new Dec(orne);
		const lunaQuantity = new Dec(luna);
		const lunaTotalPriceInUSD = new Dec(lunaQuantity).times(lunaPriceInUSD);
		const orneTotalPriceInUSD = new Dec(orneQuantity).times(ornePriceInUSD);
		const liquidity = lunaTotalPriceInUSD.add(orneTotalPriceInUSD).mul(3);
		const APR = new Dec(1_000_000).times(orne_price).dividedBy(liquidity).times(100);

		const fdv = ornePriceInUSD.times(100_000_000);
		const balanceValue = new Dec(companyBalance.data?.balance).dividedBy(1_000_000).times(ornePriceInUSD);

		setAPR(APR);
		setOrnePriceInUSD(ornePriceInUSD);
		setTotalLiquidity(liquidity);
		setFullyDilutedValue(fdv);
		setMarketCap(fdv.minus(balanceValue));
	}, [ornePoolInfo.data, lunaPoolInfo.data]);

	return { APR, ornePriceInUSD, totalLiquidity, marketCap, fullyDilutedValue, isLoading };
}
