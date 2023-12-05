import { string } from '@orne/utils';
import { useWallet } from '@terra-money/wallet-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from '~/components/ui/Button';
import { Icon } from '~/components/ui/Icon';
import { IconToken } from '~/components/ui/IconToken';
import { Popover } from '~/components/ui/Popover';
import { useConnectedWallet } from '~/hooks/useConnectedWallet';
import { useLunaBalance } from '~/hooks/useLunaBalance';
import { useOrneBalance } from '~/hooks/useOrneBalance';
import { useLPBalance } from '~/hooks/useLPBalance';
import { readAmounts } from '~/utils/readAmounts';

export function Wallet() {
	const orneBalance = useOrneBalance();
	const lunaBalance = useLunaBalance();
	const { data: balance, isLoading: isLoadingBalance } = useLPBalance();
	const wallet = useWallet();
	const connectedWallet = useConnectedWallet();
	const [isCopy, setIsCopy] = useState<boolean>(false);

	function handleCopyAddress() {
		void navigator.clipboard.writeText(connectedWallet!.terraAddress);

		setIsCopy(true);
		setTimeout(() => {
			setIsCopy(false);
		}, 2000);
	}

	return (
		<div className="flex gap-4 rounded-full bg-white p-1 pl-3 shadow-sm">
			{/*<div className="flex items-center gap-1 text-sm text-mediumGrey">*/}
			{/*	{orneBalance.isLoading ? (*/}
			{/*		<div>*/}
			{/*			<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />*/}
			{/*		</div>*/}
			{/*	) : (*/}
			{/*		<span>{readAmounts(orneBalance.data?.balance, { decimals: 18, comma: true, fixed: 3 })}</span>*/}
			{/*	)}*/}
			{/*	<span className="hidden rounded-full border border-mediumGrey px-2 py-0.5 leading-none sm:inline">ORNE</span>*/}
			{/*</div>*/}

			<div className="relative flex items-center gap-2">
				<Icon name="wallet" className="w-7" />
				<AnimatePresence>
					{isCopy && (
						<motion.span
							initial={{ x: 0, y: -8, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -16, opacity: 0 }}
							className="bg-slate-900 absolute top-7 right-0 rounded-full px-2 py-1 text-xs text-white"
						>
							Copied!
						</motion.span>
					)}
				</AnimatePresence>
				<span className="cursor-pointer text-sm" onClick={handleCopyAddress}>
					{string.truncate(connectedWallet!.terraAddress)}
				</span>
			</div>

			<Popover title="My Wallet" closable trigger={<Button size="sm">My Wallet</Button>}>
				<div className="border-beige my-6 flex flex-col justify-between border-b pb-6">
					<span className="text-darkBlue50">Total balance</span>
					{orneBalance.isLoading ? (
						<div>
							<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
						</div>
					) : (
						<p className="text-2xl font-semibold">
							{readAmounts(orneBalance.data?.balance, { decimals: 18, comma: true, fixed: 3 })}{' '}
							<span className="font-normal">xSEUL</span>
						</p>
					)}
					{isLoadingBalance ? (
						<div>
							<ThreeDots width={35} height={30} color="hsl(230, 21%, 65%)" />
						</div>
					) : (
						<p className="text-2xl font-semibold">
							{readAmounts(balance?.lpBalance)}
							<span className="font-normal">SEUL</span>
						</p>
					)}
				</div>

				{/*<div className="space-y-3">*/}
				{/*	<div className="flex items-center justify-between">*/}
				{/*		<div className="flex items-center gap-2">*/}
				{/*			<IconToken name="orne" size={44} />*/}
				{/*			<span className="text-lg font-semibold">ORNE</span>*/}
				{/*		</div>*/}
				{/*		<div className="flex flex-col text-right">*/}
				{/*			<span>0.05343</span>*/}
				{/*			<span className="text-mediumGrey">$ 456.23</span>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*	<div className="flex items-center justify-between">*/}
				{/*		<div className="flex items-center gap-2">*/}
				{/*			<IconToken name="astro" size={44} />*/}
				{/*			<span className="text-lg font-semibold">ASTRO</span>*/}
				{/*		</div>*/}
				{/*		<div className="flex flex-col text-right">*/}
				{/*			<span>0.05343</span>*/}
				{/*			<span className="text-mediumGrey">$ 456.23</span>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<Button onClick={() => wallet.disconnect()}>Disconnect</Button>
			</Popover>
		</div>
	);
}
