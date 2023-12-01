import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Oval, ThreeCircles, ThreeDots } from 'react-loader-spinner';
import { PendingTransaction } from '~/components/layout/PendingTransaction';
import { ConnectWalletButton } from '~/components/wallet/ConnectWalletButton';
import { Wallet } from '~/components/wallet/Wallet';

export function Header() {
	const { status } = useWallet();

	return (
		<header className="bg-offWhite fixed bottom-0 left-0 flex w-full items-center justify-center gap-5 p-2 lg:static lg:justify-end lg:bg-transparent">
			{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}

			{status === WalletStatus.WALLET_CONNECTED && (
				<>
					<PendingTransaction />
					<Wallet />
				</>
			)}
		</header>
	);
}
