import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { SwapForm } from '~/components/swap/SwapForm';

export function Swap() {
	const { status } = useWallet();

	return (
		<div className="mt-5 lg:-mt-6">
			<div className="mb-10 text-center lg:mb-20 lg:text-left">
				<h1 className="mb-5 text-5xl font-bold">
					<span className="swap-underline">Buy</span> xSEUL
				</h1>

				<h2 className="text-2xl">
					Instantly buy <span className="text-green">$xSEUL</span> with axlUSDT
				</h2>
			</div>

			<div className="flex flex-col gap-8 lg:flex-row">
				{status === WalletStatus.WALLET_NOT_CONNECTED && <p>Connect your wallet to start swapping.</p>}
				{status === WalletStatus.WALLET_CONNECTED && <SwapForm />}
			</div>
		</div>
	);
}
