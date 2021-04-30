<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <el-input placeholder="タイトルを入力" v-model="formData.title" />
      </div>
      <div>
        <el-input placeholder="本文を入力……" type="textarea" rows="15" v-model="formData.body" />
      </div>
      <div class="text-right" style="margin-top: 16px;">
        <el-button type="primary" @click="publish" round>
          <span class="el-icon-upload2" />
          <span>投稿</span>
        </el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  asyncData({ redirect, store }) {
    if (!store.getters['user']) {  //storeからuserが参照できなければリダイレクト
      redirect('/')
    }
    return {
      formData: {
        title: '',  //入力したタイトル
        body: ''  //入力した本文
      }
    }
  },
  computed: {
    ...mapGetters(['user'])  //user情報の参照
  },
  methods: {
    async publish() {  //投稿時
      const payload = {  //ユーザー情報と入力データを入れる
        user: this.user,
        ...this.formData
      }
      await this.publishPost({ payload })  //actionにわたす
      this.$router.push('/posts')  //投稿一覧ページへ飛ばす
    },
    ...mapActions('users', ['updateUser']),
    ...mapActions('posts', ['publishPost'])
  }
}
</script>

<style>
.posts-page .el-table__row {
  cursor: pointer;
}
</style>