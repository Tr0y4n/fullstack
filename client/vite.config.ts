import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
  server: {
    port: 3000, // Запускает сервер на 3000 порту
    open: true, // Открывает браузер автоматически
  },
});
