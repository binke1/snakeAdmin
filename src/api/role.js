import fetch from '@/utils/fetch'

export function getRoleById(id) {
  return fetch({
    url: '/permission/role/' +id,
    method: 'get'
  })
}

export function getRoleList() {
  return fetch({
    url: '/permission/role/getList',
    method: 'get'
  })
}

export function getEnableRoleList(jsonData) {
  return fetch({
    url: '/permission/role/getEnableList',
    method: 'get'
  })
}
