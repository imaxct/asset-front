import axios from '@/libs/axios'

/**
 * 获取角色列表
 */
export const listRole = () => {
  return axios.get('/Role/list')
}

/**
 * 添加role
 * @param {object} param0 参数
 */
export const addRole = ({ name, roleName, authorizedMapping }) => {
  return axios.post('/Role/save', { name, roleName, authorizedMapping })
}

/**
 * 更新role
 * @param {object} param0 参数
 */
export const updateRole = ({ id, name, roleName, authorizedMapping }) => {
  return axios.post('/Role/save', { id, name, roleName, authorizedMapping })
}
