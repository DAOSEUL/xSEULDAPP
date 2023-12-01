import path from 'node:path';
import React from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
			'@terra-money/terra.js': '@terra-money/terra.js/dist/bundle.js',
			'@terra-money/feather.js': '@terra-money/feather.js/dist/bundle.js',
			'readable-stream': 'vite-compatible-readable-stream',
		},
	},

	plugins: [React()],
});
