import axios from '@/libs/axios'

export const login = (username, password) => {
  const param = new URLSearchParams()
  param.append('username', username)
  param.append('password', password)
  return axios.post('/User/login', param)
}
