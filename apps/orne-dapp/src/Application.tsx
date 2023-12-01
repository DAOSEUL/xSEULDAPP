import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import './assets/app.css';
import { useChainOptions } from '@terra-money/wallet-provider';
import { Triangle } from 'react-loader-spinner';
import { Route, Routes } from 'react-router-dom';
import { Shell } from '~/components/layout/Shell';
import { AppProviders } from '~/configuration/AppProviders';
import { Dashboard } from '~/pages/Dashboard';
import { Earn } from '~/pages/Earn';
import { NFTVault } from '~/pages/NFTVault';
import { Swap } from '~/pages/Swap';

export function Application() {
	const chainOptions = useChainOptions();

	if (!chainOptions) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					gap: '8px',
				}}
			>
				<Triangle ariaLabel="Loading the dApp" color="hsl(203,23%,42%)" />
				<h1>SEUL</h1>
			</div>
		);
	}

	return (
		<AppProviders {...chainOptions}>
			<Shell>
				<Routes>
					<Route path={'/'} element={<Dashboard />} />
					<Route path={'/swap'} element={<Swap />} />
					<Route path={'/earn'} element={<Earn />} />
					<Route path={'/vault'} element={<NFTVault />} />
				</Routes>
			</Shell>
		</AppProviders>
	);
}
