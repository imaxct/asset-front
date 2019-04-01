export default {
  state: {
    username: '',
    userId: '',
    roleName: '',
    roleId: '',
    name: '',
    phone: ''
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
    setPhone (state, phone) {
      state.phone = phone
    }
  },
  actions: {
    handleLogin ({commit}, {username, password}) {
      return new Promise((resolve, reject) => {
        // TODO
      })
    }
  }
}
