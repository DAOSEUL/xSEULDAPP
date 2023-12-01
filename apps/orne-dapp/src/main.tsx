import buffer from 'buffer';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Application } from '~/Application';

window.Buffer = buffer.Buffer;

createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Application />
	</React.StrictMode>
);
