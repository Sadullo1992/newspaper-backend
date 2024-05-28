import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/',
    plugins: [react()],
    preview: {
      port: +env.PORT_FE,
    },
    server: {
      port: +env.PORT_FE,
      host: true,
      origin: `http://0.0.0.0:${env.PORT_FE}`,
    },
  };
});
