import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url"
import AutoImport from 'unplugin-auto-import/vite'



// https://vitejs.dev/config/
export default ({ mode }) => {

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: [
          "vue",
        ]
      })
    ],
    envDir: "./",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("/src", import.meta.url))
      }
    },
    publicDir: 'public',
    server: {
      port: 3000,
      proxy: {
        "/coinmarketcap": {
          target: process.env.VITE_API_COINMARKETCAP,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/coinmarketcap/, "")
        }
      }
    }
  })
}
