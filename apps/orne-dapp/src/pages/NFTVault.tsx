import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { PresaleNFTList } from '~/components/vault/PresaleNFTList';

export function NFTVault() {
	const { status } = useWallet();

	return (
		<div className="mt-5 lg:-mt-6">
			<div className="text-center lg:mb-20 lg:text-left">
				<h1 className="mb-5 text-5xl font-bold">
					Your <span>NFTs</span>
				</h1>
			</div>

			{status === WalletStatus.WALLET_NOT_CONNECTED && <p>Connect your wallet to see your NFTs.</p>}
			{status === WalletStatus.WALLET_CONNECTED && <PresaleNFTList />}
		</div>
	);
}
