import moment from '~/plugins/moment'

export const state = () => ({  //初期state
  posts: []
})

export const getters = {  //stateの参照
  posts: state => state.posts.map(post => Object.assign({ likes: [] }, post))
}

export const mutations = {
  addPost(state, { post }) {  //投稿時
    state.posts.push(post)
  },
  updatePost(state, { post }) {  //投稿内の情報を更新
    state.posts = state.posts.map(p => (p.id === post.id ? post : p))
  },
  clearPosts(state) {  //投稿削除
    state.posts = []
  }
}

export const actions = {
  async fetchPost({ commit }, { id }) {  //一つの投稿を取得
    const post = await this.$axios.$get(`/posts/${id}.json`)
    commit('addPost', { post: { ...post, id } })
  },
  async fetchPosts({ commit }) {  //すべての投稿を取得
    const posts = await this.$axios.$get('/posts.json')
    commit('clearPosts')  //一旦空にする
    Object.entries(posts)  //情報を格納
      .reverse()
      .forEach(([id, content]) =>
        commit('addPost', {  //mutationにわたす
          post: {
            id,
            ...content
          }
        })
      )
  },
  async publishPost({ commit }, { payload }) {  //記事投稿時
    const user = await this.$axios.$get(`/users/${payload.user.id}.json`)  //user情報を取得
    const created_at = moment().format()  //日付取得
    const post_id = (await this.$axios.$post('/posts.json', payload)).name  //firebaseで自動生成される値
    const post = { id: post_id, ...payload, created_at }
    const putData = { id: post_id, ...payload, created_at }  //user配下におく情報
    delete putData.user  //user配下だからuser情報はいらない
    await this.$axios.$put(`/users/${user.id}/posts.json`, [  //userの配下にあるpostsに置く
      ...(user.posts || []),
      putData
    ])
    commit('addPost', { post })
  },
  async addLikeToPost({ commit }, { user, post }) {  //いいねしたとき
    post.likes.push({  //いいねした記事の情報
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  },
  async removeLikeToPost({ commit }, { user, post }) {  //いいねしたとき
    const after = post.likes.filter(l => {
      return !l.user_id === user.id
    });
    post.likes = []  //一度空にする
    post.likes = after  //user idと一致したものを除いた結果を入れる
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  },
}