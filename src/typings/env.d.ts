/**
 *Тип среды фонового обслуживания
 * - dev: Среда развития
 * - test: Среда тестирования
 * - prod: Производственная среда
 */
type ServiceEnvType = 'development' | 'dev' | 'test' | 'prod'

interface ImportMetaEnv {
  /** Базовый адрес */
  readonly VITE_BASE_URL: string
  /** Название проекта */
  readonly VITE_APP_NAME: string
  /** Прокси */
  readonly VITE_HTTP_PROXY?: 'Y' | 'N'
  /** Включать упаковку и сжатие */
  readonly VITE_BUILD_COMPRESS?: 'Y' | 'N'
  /** Тип алгоритма сжатия */
  readonly VITE_COMPRESS_TYPE?:
    | 'gzip'
    | 'brotliCompress'
    | 'deflate'
    | 'deflateRaw'
  /** Режим маршрутизации */
  readonly VITE_ROUTE_MODE?: 'hash' | 'web'
  /** Режим загрузки маршрутизации */
  readonly VITE_ROUTE_LOAD_MODE: 'static' | 'dynamic'
  /** Путь к домашней странице */
  readonly VITE_HOME_PATH: string
  /** Информация об авторском праве */
  readonly VITE_COPYRIGHT_INFO: string
  /** Автоматически обновлять token */
  readonly VITE_AUTO_REFRESH_TOKEN: 'Y' | 'N'
  /** Язык по умолчанию */
  readonly VITE_DEFAULT_LANG: App.lang
  /** Тип среды обратного сервиса */
  readonly MODE: ServiceEnvType
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
