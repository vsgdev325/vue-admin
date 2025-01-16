import type { ProxyOptions } from 'vite'
import { mapEntries } from 'radash'

export function generateProxyPattern(envConfig: Record<string, string>) {
  return mapEntries(envConfig, (key, value) => {
    return [
      key,
      {
        value,
        proxy: `/proxy-${key}`,
      },
    ]
  })
}

/**
 * @description: Генерировать прокси -поле Vite
 * @param {*} envConfig - Конфигурация переменной среды
 */
export function createViteProxy(envConfig: Record<string, string>) {
  const proxyMap = generateProxyPattern(envConfig)
  return mapEntries(proxyMap, (key, value) => {
    return [
      value.proxy,
      {
        target: value.value,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(new RegExp(`^${value.proxy}`), ''),
      },
    ]
  }) as Record<string, string | ProxyOptions>
}
