/// <reference path="../global.d.ts"/>

/* Поле таблицы базы данных символов */
namespace Entity {
  interface Message {
    id: number
    type: 0 | 1 | 2
    title: string
    icon: string
    tagTitle?: string
    tagType?: 'error' | 'info' | 'success' | 'warning'
    description?: string
    isRead?: boolean
    date: string
  }
}
