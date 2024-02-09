import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
 
/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
 
    kit: {
        adapter: adapter(),
		paths: {
            base: process.env.NODE_ENV === 'production' ? '/dsc106' : '',
        },
		version: {
			pollInterval: 15_000 // In my case check for code updates every 15 seconds
		}
    }
};
 
export default config;
