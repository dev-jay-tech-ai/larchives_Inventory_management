import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config as dotenvConfig } from 'dotenv'

// Load root .env file
dotenvConfig();

export default defineConfig({
  plugins: [react()]
})