import axios from 'axios'
import { getToken } from '@libs/util'
import { TOKEN_NAME } from '@config'

const instance = axios.create({
  baseURL: '/'
})

instance.interceptors.request.use(config => {
  const token = getToken()
  if (token && token.token) {
    config.headers[TOKEN_NAME] = token.token
  }
}, err => {
  return Promise.reject(err)
})

export default instance
