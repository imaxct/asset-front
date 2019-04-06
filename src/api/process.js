import axios from '@/libs/axios'

/**
 * 获取所有流程
 */
export const getAllProcess = () => {
  return axios.get('/Process/list')
}

/**
 * 添加流程
 * @param {object} process 流程
 */
export const addProcess = (process) => {
  return axios.post('/Process/add', process)
}

/**
 * 获取流程
 * @param {integer} id id
 */
export const getProcessById = (id) => {
  return axios.get(`/Process/get?id=${id}`)
}
