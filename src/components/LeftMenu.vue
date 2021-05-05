<template>
  <div>
    <div class="top">
      <van-image :src="logo" class="logo"/>
      <span @click="toLoginPage">{{ userInfo.nickname }}</span>
    </div>
    <van-cell title="收藏的文章" :border="false" icon="like" @click="toCollectionPage"/>
<!--    <van-cell title="设置" :border="false" icon="setting"/>-->
<!--    <van-cell title="关于" :border="false" icon="info"/>-->
    <van-cell title="退出" :border="false" icon="clear" @click="doLogout"/>
  </div>
</template>

<script>

import {getRequest} from "@/utils/api";

export default {
  name: "LeftMenu",
  data() {
    return {
      logo: require('../assets/wan_android.png')
    }
  },
  mounted() {
    this.$store.commit('initUserInfo');
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    toLoginPage() {
      if (this.userInfo.nickname !== '登录') {
        return;
      }
      this.$router.push('/login');
    },
    toCollectionPage() {
      if (this.userInfo.nickname === '登录') {
        this.$toast('请先登录！');
        return;
      }
      this.clickMenuItem();
      this.$router.push('/collection');
    },
    doLogout() {
      if (this.userInfo.nickname === '登录') {
        this.$toast('请先登录！');
        return;
      }
      this.$dialog.confirm({
        title: '提示',
        message: '确定要退出登录吗？',
        width: '80%',
        confirmButtonColor: '#fe6243'
      }).then(() => {
        getRequest('/user/logout/json').then(data => {
          this.$store.commit('clearUserInfo');
        })
      }).catch(() => {
        // on cancel
      });
    },
    clickMenuItem() {
      this.$emit('clickMenuItem');
    }
  }
}
</script>

<style scoped>
.top {
  background: #fe6243;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  margin-bottom: 20px;
}

.logo {
  width: 40%;
}

.top > span {
  color: #ffffff;
  margin-top: 10px;
}

.van-cell__title {
  padding-left: 15px;
}
</style>