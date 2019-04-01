import axios from '@/libs/axios'

export const login = (username, password) => {
  return axios.post('/User/login', {username, password})
}
