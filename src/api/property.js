import axios from '@/libs/axios'

/**
 * 获取本人名下资产
 */
export const getMine = () => {
  return axios.get('/Prop/getMy')
}

/**
 * 获取本人部门资产
 */
export const getMyDep = () => {
  return axios.get('/Prop/getDep')
}

/**
 * 获取资产页所有数据
 * @param {string} pid 资产id
 */
export const getDetail = (pid) => {
  return axios.get(`/Prop/get?id=${pid}`)
}

/**
 * 根据id获取
 * @param {integer} id id
 */
export const getBrief = (id) => {
  return axios.get(`/Prop/getById?id=${id}`)
}

/**
 * 获取资产列表
 */
export const listProperty = () => {
  return axios.get('/Prop/list')
}

/**
 * 添加资产
 * @param {array} propertyList 列表
 */
export const addProperty = (propertyList) => {
  return axios.post('/Prop/add', propertyList)
}
