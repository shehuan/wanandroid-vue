<template>
  <div>
    <MyNavBar title="注册"/>

    <van-form @submit="doRegister" class="form">
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
      <van-field
          v-model="info.repassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-button round block color="#fe6243" native-type="submit" class="button">注册</van-button>
    </van-form>
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBar";
import {postKeyValueRequest} from "@/utils/api";
import {clearLoading, showLoading} from "@/utils/toast";

export default {
  name: 'Register',
  data() {
    return {
      info: {
        username: '',
        password: '',
        repassword: ''
      }
    }
  },
  components: {MyNavBar},
  methods: {
    doRegister() {
      showLoading();
      postKeyValueRequest('/user/register', this.info).then(data => {
        if (data) {
          this.$toast('注册成功，即将返回登录页面！');
          setTimeout(() => {
            this.$router.back();
          }, 2000);
        }
      }).finally(() => {
        clearLoading();
      })
    }
  }
}
</script>

<style scoped>
.form {
  margin-top: 150px;
  padding: 0 20px;
}

.button {
  margin-top: 50px;
}
</style>
