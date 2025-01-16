import { blankInstance, request } from '../http'

/* get Метод тест */
export function fetchGet(params?: any) {
  return request.Get('/getAPI', { params })
}

/* post Метод тест */
export function fetchPost(data: any) {
  return request.Post('/postAPI', data)
}
/* formPost Метод тест */
export function fetchFormPost(data: any) {
  const methodInstance = request.Post('/postFormAPI', data)
  methodInstance.meta = {
    isFormPost: true,
  }
  return methodInstance
}
/* delete Метод тест */
export function fetchDelete() {
  return request.Delete('/deleteAPI')
}
/* put Метод тест */
export function fetchPut(data: any) {
  return request.Put('/putAPI', data)
}
/* Не носить token Интерфейсерфейс */
export function withoutToken() {
  const methodInstance = request.Get('/getAPI')
  methodInstance.meta = {
    authRole: null,
  }
  return methodInstance
}
/* Преобразование данных интерфейса */
export function dictData() {
  return request.Get('/getDictData', {
    transform(rawData, _headers) {
      const response = rawData as any
      return {
        ...response,
        data: {
          ...response.data,
          gender: response.data.gender === 0 ? '男' : '女',
          status: `状态是${response.data.status}`,
        },
      }
    },
  })
}
/* Simten, чтобы получить двоичные файлы */
export function getBlob(url: string) {
  const methodInstance = blankInstance.Get<Blob>(url)
  methodInstance.meta = {
    // Идентификация - это данные Blob
    isBlob: true,
  }
  return methodInstance
}

/* Загрузить файл с прогрессом */
export function downloadFile(url: string) {
  const methodInstance = blankInstance.Get<Blob>(url)
  methodInstance.meta = {
    // Идентификация - это данные Blob
    isBlob: true,
  }
  return methodInstance
}
/* Код состояния тестирования 500 не удалось */
export function FailedRequest() {
  return request.Get('/serverError')
}

/* Проверка бизнес -кода 500 не удалось */
export function FailedResponse() {
  return request.Post('/businessError')
}
/* Тестовый бизнес -код не удается 10 000, без подсказок */
export function FailedResponseWithoutTip() {
  return request.Post('/businessErrorWithoutTip')
}
/* token неудачный интерфейс */
export function expiredTokenRequest() {
  return request.Get('/expiredToken')
}
/* Проверьте интерфейс обновления токена */
export function refreshToken() {
  return request.Get('/updataToken')
}
