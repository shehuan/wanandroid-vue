<template>
  <div>
    <MyNavBar title="登录"/>

    <van-form @submit="doLogin" class="form">
      <van-field
          v-model="info.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="info.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-button round block color="#fe6243" native-type="submit" class="login-button">登录</van-button>

      <div class="register" @click="toRegisterPage">注册账号</div>
    </van-form>
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBar";
import {postKeyValueRequest} from "@/utils/api";
import {clearLoading, showLoading} from "@/utils/toast";

export default {
  name: 'Login',
  data() {
    return {
      info: {
        username: '',
        password: ''
      }
    }
  },
  components: {MyNavBar},
  methods: {
    doLogin() {
      showLoading();
      postKeyValueRequest('/user/login', this.info).then(data => {
        if (data) {
          this.$store.commit('saveUserInfo', data);
          this.$router.back();
        }
      }).finally(() => {
        clearLoading();
      })
    },
    toRegisterPage() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.form {
  margin-top: 150px;
  padding: 0 20px;
}

.login-button {
  margin-top: 50px;
}

.register {
  color: #8a8a8a;
  font-size: 14px;
  margin-top: 20px;
  padding: 5px;
  text-align: center;
  text-decoration: underline;
}
</style>
