import axios from '@/libs/axios'

/**
 * 提交工单
 * @param {object} ticket 工单对象
 */
export const submitTicket = ({ propertyId, processId, transferUserId, applyReason, finalStatus }) => {
  return axios.post('/Ticket/submit', { propertyId, processId, transferUserId, applyReason, finalStatus })
}

/**
 * 获取工单信息, 包括处理记录
 * @param {integer} id 工单id
 */
export const getTicketDetail = (id) => {
  return axios.get(`/Ticket/get?id=${id}`)
}

/**
 * 获取个人工单历史列表
 */
export const getMyTickets = () => {
  return axios.get('/Ticket/list')
}

export const getTodoTickets = () => {
  return axios.get('/Ticket/todo')
}
