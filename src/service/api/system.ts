import { request } from '../http'

// Получите всю информацию о маршруте
export function fetchAllRoutes() {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]>>('/getUserRoutes')
}

// Получите всю пользовательскую информацию
export function fetchUserPage() {
  return request.Get<Service.ResponseResult<Entity.User[]>>('/userPage')
}
// Получение всего углового списка
export function fetchRoleList() {
  return request.Get<Service.ResponseResult<Entity.Role[]>>('/role/list')
}

/**
 * Запрос на получение списка словаря
 *
 * @param code - Словарь кодирование, используемое для проверки конкретного списка словаря
 * @returns Данные списка словар
 */
export function fetchDictList(code?: string) {
  const params = { code }
  return request.Get<Service.ResponseResult<Entity.Dict[]>>('/dict/list', { params })
}
