import axios from '@/libs/axios'

export const getAllMessage = () => {
  return axios.get('/Msg/list')
}

export const getUnreadMessage = () => {
  return axios.get('/Msg/unread')
}

export const readMessage = ({ id }) => {
  return axios.post('/Msg/read', { id })
}

export const getUnreadCount = () => {
  return axios.get('/Msg/count')
}
