import fetch from '@/utils/fetch'

export function getProductById(id) {
  return fetch({
    url: '/prepaidCard/' + id,
    method: 'get'
  })
}

export function updateProduct(jsonData) {
  return fetch({
    url: '/prepaidCard/update',
    method: 'post',
    data: jsonData
  })
}

export function createProduct(jsonData) {
  return fetch({
    url: '/prepaidCard/create',
    method: 'post',
    data: jsonData
  })
}

export function getPagePrepaidCard(pageNo, pageSize, jsonData) {
  return fetch({
    url: 'prepaidCard/getPage?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: jsonData
  })
}
