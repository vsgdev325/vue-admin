/// <reference path="../global.d.ts"/>

/** Поле таблицы базы данных пользователей */
namespace Entity {
  interface User {
    /** ID пользователя */
    id?: number
    /** имя пользователя */
    userName?: string
    /* Пользовательский аватар */
    avatar?: string
    /* Пол */
    gender?: 0 | 1
    /* Пользовательский почтовый ящик */
    email?: string
    /* Пользовательский ник */
    nickname?: string
    /* Пользовательский телефон */
    tel?: string
    /** Роль пользователя */
    role?: Entity.RoleType[]
    /** Статус пользователя */
    status?: 0 | 1
    /** Примечание */
    remark?: string
  }

}
