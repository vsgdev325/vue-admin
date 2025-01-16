/// <reference path="../global.d.ts"/>

namespace Api {
  namespace Login {
    /* Войдите в поле пользователя, которое основано на расширении id пользователя */
    interface Info extends Entity.User {
      /** id пользователя */
      id: number
      /** Пользовательский тип символов */
      role: Entity.RoleType
      /** Посещать token */
      accessToken: string
      /** обновлять token */
      refreshToken: string
    }
  }
}
