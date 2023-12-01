import { ToastBar, Toaster } from 'react-hot-toast';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Shell({ children }: { children: ReactNode }) {
	return (
		<div className="flex">
			<Sidebar />
			<div className="lg:pl-90 flex-1 px-10 py-8 pr-10 lg:pl-[360px]">
				<Header />
				{children}
			</div>
		</div>
	);
}
