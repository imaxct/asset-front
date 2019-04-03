import axios from '@/libs/axios'

/**
 * 获取所有部门
 */
export const listDep = () => {
  return axios.get('/Dep/list')
}

/**
 * 添加部门
 * @param {object} param0 参数
 */
export const addDep = ({ name }) => {
  return axios.post('/Dep/add', { name })
}

/**
 * 修改部门
 * @param {object} param0 参数
 */
export const updateDep = ({ id, name }) => {
  return axios.post('/Dep/update', { id, name })
}
