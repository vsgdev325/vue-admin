/** Связанный тип запроса */
declare namespace Service {
  import type { Method } from 'alova'

  interface AlovaConfig {
    baseURL: string
    timeout?: number
    beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
  }

  /** Конфигурация структуры данных, возвращаемая интерфейсом BackEnd */
  interface BackendConfig {
    /** Указывает поле атрибута кода состояния запроса BackEnd */
    codeKey?: string
    /** Указывает поле атрибута данных запроса BackEnd */
    dataKey?: string
    /** Поле атрибута сообщения - */
    msgKey?: string
    /** Статус успешного запроса, определенного в бизнесе на BackEnd */
    successCode?: number | string
  }

  type RequestErrorType = 'Response Error' | 'Business Error' | null
  type RequestCode = string | number

  interface RequestError {
    /** Тип ошибки службы запроса */
    errorType: RequestErrorType
    /** Код ошибки */
    code: RequestCode
    /** Сообщение об ошибке */
    message: string
    /** Данные */
    data?: any
  }

  interface ResponseResult<T> extends RequestError {
    /** Служба запроса успешна */
    isSuccess: boolean
    /** Тип ошибки службы запроса */
    errorType: RequestErrorType
    /** Код ошибки */
    code: RequestCode
    /** Сообщение об ошибке */
    message: string
    /** Вернуть данные */
    data: T
  }
}
