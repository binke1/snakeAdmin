import fetch from '@/utils/fetch'

export function createClient(jsonData) {
  return fetch({
    url: '/users/client/create',
    method: 'post',
    data: jsonData
  })
}

export function getUserByUuid(uuid) {
  return fetch({
    url: '/users/uuid/' + uuid,
    method: 'get'
  })
}

export function updateCompanyList(jsonData) {
  return fetch({
    url: '/users/updateCompanyList',
    method: 'post',
    data: jsonData
  })
}

export function sendCompanyAccountAndPasswordMailByUserUuid(userUuid) {
  return fetch({
    url: '/users/company/sendCompanyAccountAndPasswordMail/' + userUuid,
    method: 'get'
  })
}

export function updateUserRoleList(jsonData) {
  return fetch({
    url: '/users/updateRoleList',
    method: 'post',
    data: jsonData
  })
}

export function createUser(jsonData) {
  return fetch({
    url: '/users/user/create',
    method: 'post',
    data: jsonData
  })
}

export function editUser(jsonData) {
  return fetch({
    url: '/users/user/update',
    method: 'post',
    data: jsonData
  })
}

export function editClient(jsonData) {
  return fetch({
    url: '/users/client/update',
    method: 'post',
    data: jsonData
  })
}

export function getClientPage(jsonData, pageNo, pageSize) {
  return fetch({
    url: '/users/getClientPage?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: jsonData
  })
}

export function activeClient(userUuid) {
  return fetch({
    url: '/users/activeClient/' + userUuid,
    method: 'get'
  })
}
