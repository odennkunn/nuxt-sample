<template>
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="1" style="pointer-events:none;">
      みんなのぶろぐ
    </el-menu-item>
    <el-menu-item index="2" :route="{ path: '/posts/' }">
      投稿一覧
    </el-menu-item>

      <el-menu-item index="3" style="float: right;" :route="{ path: `/users/${user.id}` }" v-if="user">
        <span>ユーザーID：{{user.id}}</span>
      </el-menu-item>
      <el-menu-item index="4" style="float: right;" v-if="user">
        <span>ユーザー名：{{user.name}}</span>
      </el-menu-item>
      <el-menu-item index="5" style="float: right;" :route="{ path: '/' }" v-else>
        <span>ログイン</span>
      </el-menu-item>
      <el-menu-item index="5" style="float: right" :route="{ path: '/posts/new' }">
        新規投稿
      </el-menu-item>
      <el-menu-item index="6" style="float: right;" v-if="user" @click="logout" :route="{ path: '/' }">
        <span>ログアウト</span>
      </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'universal-cookie'

export default {
  computed: {
    ...mapGetters(['user'])   //storeにあるuser情報の呼び出し
  },
  methods: {
    async logout() {  //ログアウト処理
      const cookies = new Cookies();
      await this.logout();
      cookies.remove('user');  //クッキーの削除 これだけでいいのかよくわからん
    },
    ...mapActions(['logout'])  //store内のactionの呼び出し
  }
}

</script>