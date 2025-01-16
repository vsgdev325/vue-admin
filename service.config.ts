/** Конфигурация среды различных служб запросая среды различных служб запроса */
export const serviceConfig: Record<ServiceEnvType, Record<string, string>> = {
  development: {
    url: 'https://mock.apifox.cn/m1/4071143-0-default',
  },
  dev: {
    url: 'https://mock.apifox.cn/m1/4071143-0-default',
  },
  test: {
    url: 'https://mock.apifox.cn/m1/4071143-0-default',
  },
  prod: {
    url: 'https://mock.apifox.cn/m1/4071143-0-default',
  },
}
