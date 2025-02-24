import { AlertModule } from 'vux'
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

export const showMsg = ({ content, replacePath, router }) => {
  AlertModule.show({
    title: '提示',
    content,
    onHide () {
      if (replacePath) {
        router.push({
          path: replacePath
        })
      }
    }
  })
}

export const PropertyStatus = {
  PENDING_IMPORT: '等待入库',
  IDLE: '空闲',
  OCCUPIED: '使用中',
  PROCESSING: '流程处理中',
  DAMAGED: '损坏',
  LOST: '丢失',
  RUINED: '报废',
  OUT_OF_WORK: '故障'
}

export const TicketStatus = {
  SUBMIT: '已提交',
  PROCESSING: '审批中',
  PASS: '审批通过',
  DENY: '审批未通过',
  DONE: '工单关闭'
}
