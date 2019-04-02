export const TOKEN_KEY = 'token'

export const canTurnTo = (name, access, routes) => {
  const routeIterate = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routeIterate(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }
  return routeIterate(routes)
}

const hasAccess = (access, route) => {
  if (route.access) return route.access.contains(access)
  return true
}

export const getToken = () => {
  const rawJson = localStorage.getItem(TOKEN_KEY)
  const token = JSON.parse(rawJson)
  const gmtCreate = (token && token['gmtCreate']) || 0xffffffff
  const expireSecond = (token && token['expire']) || 0
  const nowTime = new Date().getTime() / 1000
  if (expireSecond - (nowTime - gmtCreate) <= 0) {
    return null
  }
  return token
}

export const setToken = (token) => {
  token['gmtCreate'] = new Date().getTime() / 1000
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}
