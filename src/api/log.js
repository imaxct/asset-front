import axios from '@/libs/axios'

/**
 * 处理一个步骤
 * @param {object} param0 参数
 */
export const process = ({ stepId, ticketId, pass, processProposal }) => {
  return axios.post('/Log/process', { stepId, ticketId, pass, processProposal })
}
