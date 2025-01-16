import { fetchUpdateToken } from '@/service'
import { useAuthStore } from '@/store'
import { local } from '@/utils'
import {
  ERROR_NO_TIP_STATUS,
  ERROR_STATUS,
} from './config'

type ErrorStatus = keyof typeof ERROR_STATUS

/**
 * @description: Запрос на обработку успешна, но сервер обратной стороны возвращается, чтобы сообщить об ошибке
 * @param {Response} response
 * @return {*}
 */
export function handleResponseError(response: Response) {
  const error: Service.RequestError = {
    errorType: 'Response Error',
    code: 0,
    message: ERROR_STATUS.default,
    data: null,
  }
  const errorCode: ErrorStatus = response.status as ErrorStatus
  const message = ERROR_STATUS[errorCode] || ERROR_STATUS.default
  Object.assign(error, { code: errorCode, message })

  showError(error)

  return error
}

/**
 * @description:
 * @param {Record} data Фоновые данные, возвращаемые интерфейсом
 * @param {Service} config Конфигурация фонового поля
 * @return {*}
 */
export function handleBusinessError(data: Record<string, any>, config: Required<Service.BackendConfig>) {
  const { codeKey, msgKey } = config
  const error: Service.RequestError = {
    errorType: 'Business Error',
    code: data[codeKey],
    message: data[msgKey],
    data: data.data,
  }

  showError(error)

  return error
}

/**
 * @description: Единый успех и сбой типа возврата
 * @param {any} data
 * @param {boolean} isSuccess
 * @return {*} result
 */
export function handleServiceResult(data: any, isSuccess: boolean = true) {
  const result = {
    isSuccess,
    errorType: null,
    ...data,
  }
  return result
}

/**
 * @description: Процесс интерфейса обновление token
 * @return {*}
 */
export async function handleRefreshToken() {
  const authStore = useAuthStore()
  const isAutoRefresh = import.meta.env.VITE_AUTO_REFRESH_TOKEN === 'Y'
  if (!isAutoRefresh) {
    await authStore.logout()
    return
  }

  // обновлять token
  const { data } = await fetchUpdateToken({ refreshToken: local.get('refreshToken') })
  if (data) {
    local.set('accessToken', data.accessToken)
    local.set('refreshToken', data.refreshToken)
  }
  else {
    // Обновление не удалось, выйти
    await authStore.logout()
  }
}

export function showError(error: Service.RequestError) {
  // Если ошибка не должна запрашивать, пропустите
  const code = Number(error.code)
  if (ERROR_NO_TIP_STATUS.includes(code))
    return

  window.$message.error(error.message)
}
