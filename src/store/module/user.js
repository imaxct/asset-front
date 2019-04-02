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
    expire: 0
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
    }
  },
  actions: {
    handleLogin ({commit}, {username, password}) {
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
            setToken({
              username: data.username,
              userId: data.id,
              roleName: data.role.name,
              roleId: data.role.roleName,
              name: data.name,
              token: data.token,
              expire: data.expireSecond
            })
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLogout ({state, commit}) {
      return new Promise((resolve, reject) => {
        commit('setUserId', '')
        commit('setToken', '')
        commit('setExpire', 0)
        setToken({})
        resolve()
      })
    }
  }
}
