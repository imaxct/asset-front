import { login } from '@/api/user'
import { setToken } from '@/libs/util'
export default {
  state: {
    username: '',
    userId: '',
    roleName: '',
    roleId: '',
    name: '',
    token: '',
    expire: 0,
    depName: '',
    depId: 0
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
    },
    setUserId (state, userId) {
      state.userId = userId
    },
    setRoleName (state, roleName) {
      state.roleName = roleName
    },
    setRoleId (state, roleId) {
      state.roleId = roleId
    },
    setName (state, name) {
      state.name = name
    },
    setToken (state, token) {
      state.token = token
    },
    setExpire (state, expire) {
      state.expire = expire
    },
    setDepName (state, depName) {
      state.depName = depName
    },
    setDepId (state, depId) {
      state.depId = depId
    }
  },
  actions: {
    handleLogin ({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password).then(res => {
          if (res.data.ok) {
            const data = res.data.obj
            commit('setUsername', data.username)
            commit('setUserId', data.id)
            commit('setRoleName', data.role.name)
            commit('setRoleId', data.role.roleName)
            commit('setName', data.name)
            commit('setToken', data.token)
            commit('setExpire', data.expireSecond)
            commit('setDepName', data.depName)
            commit('setDepId', data.depId)
            setToken({
              username: data.username,
              userId: data.id,
              roleName: data.role.name,
              roleId: data.role.roleName,
              name: data.name,
              token: data.token,
              expire: data.expireSecond,
              depId: data.depId,
              depName: data.depName
            })
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLogout ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setUserId', '')
        commit('setToken', '')
        commit('setExpire', 0)
        setToken({})
        resolve()
      })
    },
    handleToken ({ commit }, token) {
      return new Promise((resolve, reject) => {
        try {
          commit('setUsername', token.username)
          commit('setUserId', token.userId)
          commit('setRoleName', token.roleName)
          commit('setRoleId', token.roleId)
          commit('setName', token.name)
          commit('setToken', token.token)
          commit('setExpire', token.expire)
          commit('setDepName', token.depName)
          commit('setDepId', token.depId)
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
