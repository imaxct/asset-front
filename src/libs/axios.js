import axios from 'axios'
import { getToken } from '@/libs/util'
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.API_BASE_URL
})

const TOKEN_NAME = 'Random-timestamp'

instance.interceptors.request.use(config => {
  const token = getToken()
  if (token && token.token) {
    config.headers[TOKEN_NAME] = token.token
  }
  if (!store.state.loading.isLoading) {
    store.commit('updateLoadingStatus', { isLoading: true })
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(response => {
  if (store.state.loading.isLoading) {
    store.commit('updateLoadingStatus', { isLoading: false })
  }
  return response
}, err => {
  if (store.state.loading.isLoading) {
    store.commit('updateLoadingStatus', { isLoading: false })
  }
  return Promise.reject(err)
})

export default instance
