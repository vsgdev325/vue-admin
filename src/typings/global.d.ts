/* Хранить тип таблицы сущностей базы данных, конкретный контент ./entities */
declare namespace Entity {
}

/* Типы данных, возвращаемые различными интерфейсами, конкретный контент ./api */
declare namespace Api {

}

interface Window {
  $loadingBar: import('naive-ui').LoadingBarApi
  $dialog: import('naive-ui').DialogApi
  $message: import('naive-ui').MessageApi
  $notification: import('naive-ui').NotificationApi
}

declare const AMap: any
declare const BMap: any

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare namespace NaiveUI {
  type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
}

declare namespace Storage {
  interface Session {
    dict: DictMap
  }

  interface Local {
    /* Хранить информацию пользователя */
    userInfo: Api.Login.Info
    /* Доступ к хранению token */
    accessToken: string
    /* Обновление хранения token */
    refreshToken: string
    /* Магазин учетной записи входа в систему */
    loginAccount: any
    /* Хранить текущий язык */
    lang: App.lang
  }
}

declare namespace App {
  type lang = 'zhCN' | 'enUS' | 'ruRU'
}

interface DictMap {
  [key: string]: Entity.Dict[]
}
