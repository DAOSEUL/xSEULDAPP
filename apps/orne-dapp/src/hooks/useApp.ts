import { useContext } from 'react';
import { OrneContext } from '~/context/OrneProvider';

export function useApp() {
	const context = useContext(OrneContext);

	if (!context) {
		throw new Error('useApp must be used within an OrneProvider');
	}

	return context;
}
