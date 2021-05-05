<template>
  <van-nav-bar safe-area-inset-top fixed class="nav-bg"
               @click-left="back">
    <template #left>
      <van-icon name="arrow-left" color="#fff" size="30"/>
      <span class="nav-title">{{ title }}</span>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: "MyNavBar",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    // 返回上级页面
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-bg {
  background-color: #fe6243
}

.nav-title {
  color: #fff;
  font-size: 18px;
  margin-left: 5px;
  margin-top: 3px;
}
</style>