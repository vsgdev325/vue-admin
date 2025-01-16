import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/plugins'
import { createViteProxy } from './build/proxy'
import { serviceConfig } from './service.config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // В соответствии с текущим каталогом рабочей `mode` нагрузка .env документ
  const env = loadEnv(mode, __dirname, '') as ImportMetaEnv
  const envConfig = serviceConfig[mode as ServiceEnvType]

  return {
    base: env.VITE_BASE_URL,
    plugins: createVitePlugins(env),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 9980,
      host: '127.0.0.1',
      proxy:
        env.VITE_HTTP_PROXY === 'Y' ? createViteProxy(envConfig) : undefined,
    },
    build: {
      target: 'esnext',
      reportCompressedSize: false, // Включить/отключить gzip Отчет о сжатии
    },
    optimizeDeps: {
      include: ['echarts', 'md-editor-v3', 'quill'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  }
})
