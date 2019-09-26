import fetch from '@/utils/fetch'

export function createProduct(jsonData) {
  return fetch({
    url: '/prepaidCard/create',
    method: 'post',
    data: jsonData
  })
}
