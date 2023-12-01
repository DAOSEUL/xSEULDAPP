import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WalletProvider } from '@terra-money/wallet-provider';
import { BrowserRouter } from 'react-router-dom';
import { OrneProvider } from '~/context/OrneProvider';
import type { WalletControllerChainOptions } from '@terra-money/wallet-provider';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();

type AppProvidersProps = {
	children: ReactNode;
} & WalletControllerChainOptions;

export function AppProviders({ children, defaultNetwork, walletConnectChainIds }: AppProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<WalletProvider defaultNetwork={defaultNetwork} walletConnectChainIds={walletConnectChainIds}>
					<OrneProvider>{children}</OrneProvider>
				</WalletProvider>
			</BrowserRouter>

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
