import moment from '~/plugins/moment'

export const state = () => ({  //初期状態の設定
  isLoggedIn: false,
  user: null
})

export const getters = {  //stateの参照
  isLoggedIn: state => state.isLoggedIn,
  user: state => (state.user ? Object.assign({ likes: [] }, state.user) : null)
}

export const mutations = {  //stateの変更
  setUser(state, { user }) {
      state.user = user
      state.isLoggedIn = true
  },
  resetUser(state) {
    state.user = null
    state.isLoggedIn = false
},
  updateUser(state, user) {  //投稿更新
  state.user = (state.user.id === user.user.id) ? user.user : state.user
},
}

export const actions = {
  async login({ commit }, { id }) {  //ログイン
      const user = await this.$axios.$get(`/users/${id}.json`)
      if (!user.id) throw new Error('Invalid user')
      commit('setUser', { user })  // //mutationにuser情報を渡す
  },
  async logout({ commit }) {  //ログアウト
    commit('resetUser')
},
  async register({ commit }, { id, name, image }) {  //アカウント作成
      const payload = {}
      payload[id] = { id, name, image }  //idには入力したidが入る
      await this.$axios.$patch('/users.json', payload)  //user情報を更新
      const user = await this.$axios.$get(`/users/${id}.json`)  //user情報を格納
      if (!user.id) throw new Error('Invalid user')
      commit('setUser', { user })  //mutationにuser情報を渡す
  },
  async addLikeLogToUser({ commit }, { user, post }) {  //いいね情報をuserの中に格納
    user.likes.push({  //いいねした記事の情報
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })
    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    console.log(newUser)
    commit('updateUser', { user: newUser })
  },
  async removeLikeLogToUser({ commit }, { user, post }) {  //いいね情報をuserの中から削除
    const after = user.likes.filter(l => {
      return l.post_id !== post.id
    });
    user.likes = [];
    user.likes = after;
    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    console.log(newUser);
    commit('updateUser', { user: newUser })
  },
}