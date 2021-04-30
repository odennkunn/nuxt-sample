<template>
  <section class="container">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <span>ログイン</span>
      </div>
      <form>
        <div class="form-content">
          <span>ユーザー ID</span>
          <el-input placeholder="" v-model= "formData.id" />
        </div>
        <div class="form-content" v-if= "isCreateMode">
          <span>ユーザー名</span>
          <el-input placeholder="" v-model= "formData.name" />
        </div>
        <div class="form-content" v-if= "isCreateMode">
          <span>アイコン画像</span>
          <el-input placeholder="画像アドレスを入力して下さい" v-model= "formData.image" />
        </div>
        <div class="form-content">
          <el-checkbox v-model= "isCreateMode">アカウントを作成する</el-checkbox>
        </div>
        <div class="text-right">
          <el-button type="primary" @click="handleClickSubmit">{{buttonText}}</el-button>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'universal-cookie'

export default {
  asyncData({ redirect, store }) {
    if (store.getters['user']) {  //ログインしていたらリダイレクト
      redirect('/posts/')
    }
    return {
      isCreateMode: false,  //アカウント作成かログインの分岐
      formData: {
        id: '',   //入力されたid
        name: '',  //入力された名前
        image: '',  //選択された画像
      }
    }
  },
  computed: {
    buttonText() {
      return this.isCreateMode ? '新規登録' : 'ログイン'
    },
    ...mapGetters(['user'])  //storeにあるuser情報の呼び出し
  },
  methods: {
    async handleClickSubmit() {  //登録orログイン押したとき
      const cookies = new Cookies()
      if (this.isCreateMode) {  //登録時
        try {
          await this.register({ ...this.formData })  //storeの関数に入力された値を渡す
          this.$notify({  //elementのui
            type: 'success',
            title: 'アカウント作成完了',
            message: `ID：${this.formData.id} 名前：${this.formData.name} として登録しました`,
            position: 'bottom-right',
            duration: 1000
          })
          cookies.set('user', JSON.stringify(this.user)) //cookieにuser情報をset
          this.$router.push('/posts/')  //登録後は投稿一覧ページにリダイレクト
        } catch (e) {
          this.$notify.error({  //エラー処理
            title: 'アカウント作成失敗',
            message: '既に登録されているか、不正なユーザー ID です',
            position: 'bottom-right',
            duration: 1000
          })
        }
      } else {
        try {  //ログイン時
          await this.login({ ...this.formData })  //loginアクションに入力した値を渡す
          this.$notify({
            type: 'success',
            title: 'ログイン成功',
            message: `${this.formData.id} としてログインしました`,
            position: 'bottom-right',
            duration: 1000
          })
          cookies.set('user', JSON.stringify(this.user))  //cookieにset
          this.$router.push('/posts/')  //投稿一覧ページにリダイレクト
        } catch (e) {
          this.$notify.error({
            title: 'ログイン失敗',
            message: '不正なユーザー ID です',
            position: 'bottom-right',
            duration: 1000
          })
        }
      }
    },
    ...mapActions(['login', 'register'])  //store内のactionの呼び出し
  }
}
</script>

<style scoped>
.form-content {
  margin: 16px 0;
}
</style>