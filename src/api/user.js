import axios from '@/libs/axios'

/**
 * 登陆
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export const login = ({ username, password }) => {
  return axios.post('/User/login', { username, password })
}

/**
 * 修改密码
 * @param {object} param0 参数
 */
export const changePassword = ({ newPassword, oldPassword }) => {
  if (!(newPassword.length >= 6 && newPassword.length < 64)) {
    throw new Error('密码长度错误')
  }
  return axios.post('/User/passwd', { password: newPassword, oldPassword })
}

/**
 * 分页获取用户列表
 * @param {object} param0 pageNo和size
 */
export const listUser = ({ pageNo, size }) => {
  return axios.post('/User/list', { pageNo, size })
}

/**
 * 更新用户信息
 * @param {object} param0 用户信息
 */
export const updateUser = ({ id, name, depId, roleId }) => {
  return axios.post('/User/save', { id, name, depId, roleId })
}

/**
 * 创建新用户
 * @param {object} param0 用户信息
 */
export const createUser = ({ username, password, name, depId, roleId }) => {
  return axios.post('/User/new', { username, password, name, depId, roleId })
}

/**
 * 根据用户id获取姓名
 * @param {integer} id 用户id
 */
export const getUserNameById = (id) => {
  return axios.get(`/User/getUserName?id=${id}`)
}
