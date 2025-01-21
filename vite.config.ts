import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import UnoCSS from 'unocss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter(), UnoCSS()],
})
