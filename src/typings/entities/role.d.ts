/// <reference path="../global.d.ts"/>

/* Поле таблицы базы данных символов */
namespace Entity {
  type RoleType = 'super' | 'admin' | 'user'

  interface Role {
    /** id роли */
    id?: number
    /** имя роли */
    role?: RoleType
  }
}
