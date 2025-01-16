import { local } from '@/utils'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import adapterFetch from 'alova/fetch'
import VueHook, { type VueHookType } from 'alova/vue'
import {
  DEFAULT_ALOVA_OPTIONS,
  DEFAULT_BACKEND_OPTIONS,
} from './config'
import {
  handleBusinessError,
  handleRefreshToken,
  handleResponseError,
  handleServiceResult,
} from './handle'

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<VueHookType>({
  // Сервер судит что token истекает
  refreshTokenOnSuccess: {
    // Когда сервер возвращает 401, это означает, что token истекает
    isExpired: (response, method) => {
      const isExpired = method.meta && method.meta.isExpired
      return response.status === 401 && !isExpired
    },

    // Когда token истекает, token запускается в этой функции
    handler: async (_response, method) => {
      // Примите здесь ограничения, чтобы предотвратить неограниченное циркуляцию истечения срока службы запроса
      if (!method.meta)
        method.meta = { isExpired: true }
      else
        method.meta.isExpired = true

      await handleRefreshToken()
    },
  },
  // Добавить token в заголовок запроса
  assignToken: (method) => {
    method.config.headers.Authorization = `Bearer ${local.get('accessToken')}`
  },
})

// docs path of alova.js https://alova.js.org/
export function createAlovaInstance(
  alovaConfig: Service.AlovaConfig,
  backendConfig?: Service.BackendConfig,
) {
  const _backendConfig = { ...DEFAULT_BACKEND_OPTIONS, ...backendConfig }
  const _alovaConfig = { ...DEFAULT_ALOVA_OPTIONS, ...alovaConfig }

  return createAlova({
    statesHook: VueHook,
    requestAdapter: adapterFetch(),
    cacheFor: null,
    baseURL: _alovaConfig.baseURL,
    timeout: _alovaConfig.timeout,

    beforeRequest: onAuthRequired((method) => {
      if (method.meta?.isFormPost) {
        method.config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        method.data = new URLSearchParams(method.data as URLSearchParams).toString()
      }
      alovaConfig.beforeRequest?.(method)
    }),
    responded: onResponseRefreshToken({
      // Перехватчик, который запрашивает успешный запрос
      onSuccess: async (response, method) => {
        const { status } = response

        if (status === 200) {
          // Вернуться к данным Blob
          if (method.meta?.isBlob)
            return response.blob()

          // Вернуться к данным JSON
          const apiData = await response.json()
          // Успешный запрос
          if (apiData[_backendConfig.codeKey] === _backendConfig.successCode)
            return handleServiceResult(apiData)

          // Неспособность для бизнес -запросов
          const errorResult = handleBusinessError(apiData, _backendConfig)
          return handleServiceResult(errorResult, false)
        }
        // Отказ запроса интерфейса
        const errorResult = handleResponseError(response)
        return handleServiceResult(errorResult, false)
      },
      onError: (error, method) => {
        const tip = `[${method.type}] - [${method.url}] - ${error.message}`
        window.$message?.warning(tip)
      },

      onComplete: async (_method) => {
        // Запрос на обработку полная логика
      },
    }),
  })
}
