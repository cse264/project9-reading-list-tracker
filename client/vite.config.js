import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Any request the React app makes to /books is forwarded to the
    // Express server, so you can write fetch('/books') in your code.
    proxy: {
      '/books': 'http://localhost:3001',
    },
  },
});
