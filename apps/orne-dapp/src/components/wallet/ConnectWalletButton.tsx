import { ConnectType, useWallet } from '@terra-money/wallet-provider';
import { Button } from '~/components/ui/Button';
import { Popover } from '~/components/ui/Popover';

export function ConnectWalletButton() {
	const { availableConnections, connect } = useWallet();

	const allowedConnections = availableConnections.filter((connection) =>
		[ConnectType.EXTENSION, ConnectType.WALLETCONNECT].includes(connection.type)
	);

	return (
		<Popover title="Connect to a wallet" closable trigger={<Button size="sm">Connect Wallet</Button>}>
			<div className="mt-6 flex flex-col gap-4">
				{allowedConnections.map((connection) => (
					<div
						className="cursor-pointer rounded-lg bg-beige p-4 transition-colors hover:bg-green hover:text-white"
						key={connection.type}
						onClick={() => connect(connection.type)}
					>
						{connection.name}
					</div>
				))}
			</div>
		</Popover>
	);
	//

	//
	// 	return (
	// 		<DropdownMenu.Root>
	// 			<Trigger>Connect Wallet</Trigger>
	//
	// 			<Content align={'start'}>
	// 				{allowedConnections.map((connection) => (
	// 					<Item key={connection.type} onClick={() => connect(connection.type)}>
	// 						{connection.name}
	// 					</Item>
	// 				))}
	// 			</Content>
	// 		</DropdownMenu.Root>
	// 	);
}
