import fetch from "@/utils/fetch";

export function register(jsonData) {
  return fetch({
    url: '/register',
    method: 'post',
    data: jsonData
  })
}

export function activeUser(activeMailUuid, userUuid) {
  return fetch({
    url: '/activeClient/' + activeMailUuid +'/' + userUuid,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
