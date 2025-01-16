declare namespace AppRoute {

  type MenuType = 'dir' | 'page'
  /** Единый маршрут переносится meta Идентифицировать */
  interface RouteMeta {
    /* Название страницы, обычно необязательное. */
    title: string
    /* Значок, обычно в сочетании с использованием меню */
    icon?: string
    /* Вам нужны разрешения входа в систему. */
    requiresAuth?: boolean
    /* Персонаж, к которому можно получить доступ */
    roles?: Entity.RoleType[]
    /* Включить кеш страницы */
    keepAlive?: boolean
    /* Некоторые маршруты не хотят отображаться в меню, например, некоторые страницы редактирования. */
    hide?: boolean
    /* Сортировка меню. */
    order?: number
    /* Внешняя цепь */
    href?: string
    /** Текущая маршрутизация не отображается в левом меню, но ситуация меню должна быть выделена */
    activeMenu?: string
    /** Будет ли текущая маршрутизация добавлена ​​на вкладку */
    withoutTab?: boolean
    /** Будет ли текущая маршрутизация зафиксирована на вкладке и используется для некоторой страницы резидента */
    pinTab?: boolean
    /** Текущая маршрутизация - это каталог или страница в левом меню, без настройки страницы по умолчанию по умолчанию по умолчанию */
    menuType?: MenuType
  }

  type MetaKeys = keyof RouteMeta

  interface baseRoute {
    /** Название маршрута (уникальный логотип маршрутизации) */
    name: string
    /** Маршрут */
    path: string
    /** Перенаправление маршрута */
    redirect?: string
    /* Адрес компонента страницы */
    componentPath?: string | null
    /* Идентификатор маршрутизации */
    id: number
    /* Идентификатор маршрута отца, верхняя страница нулевая */
    pid: number | null
  }

  /** Структура типа одной маршрутизации (режим динамической маршрутизации: маршрут обратно на задний план возвращает этот тип структуры) */
  type RowRoute = RouteMeta & baseRoute

  /**
   * Реальная структура маршрутизации монтажа в проект
   */
  interface Route extends baseRoute {
    /** Sub-route */
    children?: Route[]
    /* Компонент страницы */
    component: any
    /** Описание маршрутизации */
    meta: RouteMeta
  }

}
