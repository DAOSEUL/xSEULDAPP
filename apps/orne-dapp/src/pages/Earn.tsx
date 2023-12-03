import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { useState } from 'react';
import { PoolInfo } from '~/components/earn/PoolInfo';
import { ProvideForm } from '~/components/earn/ProvideForm';
import { WithdrawForm } from '~/components/earn/WithdrawForm';
import { Button } from '~/components/ui/Button';

export function Earn() {
	const { status } = useWallet();
	const [openForm, setOpenForm] = useState<'provide' | 'withdraw'>('provide');

	return (
		<div className="mt-5 lg:-mt-6">
			<div className="mb-10 text-center lg:mb-20 lg:text-left">
				<h1 className="mb-5 text-5xl font-bold">
					<span className="earn-underline">MINT</span> BURN
				</h1>
				<h2 className="text-2xl">
					SEUL <span className="text-green">xSEUL</span>
				</h2>
			</div>

			<PoolInfo />

			{status === WalletStatus.WALLET_CONNECTED && (
				<>
					<div className="mb-20 flex w-full justify-end gap-3 p-5">
						<Button
							className="w-full lg:w-1/5"
							variant={openForm === 'provide' ? 'fill' : 'outline'}
							onClick={() => setOpenForm('provide')}
						>
							Mint xSEUL
						</Button>

						<Button
							className="w-full lg:w-1/5"
							variant={openForm === 'withdraw' ? 'fill' : 'outline'}
							onClick={() => setOpenForm('withdraw')}
						>
							Burn xSEUL
						</Button>
					</div>

					{openForm === 'provide' && <ProvideForm />}
					{openForm === 'withdraw' && <WithdrawForm />}
				</>
			)}
		</div>
	);
}
