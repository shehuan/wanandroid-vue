<template>
  <div>
    <van-nav-bar fixed safe-area-inset-top class="nav-bg" @click-left="showMenu(true)" @click-right="openSearchPage">
      <template #right>
        <van-icon name="search" color="#fff" size="30"/>
      </template>
      <template #left>
        <van-icon name="bars" color="#fff" size="30"/>
        <span class="nav-title">{{ items[active] }}</span>
      </template>
    </van-nav-bar>

    <keep-alive>
      <router-view style="margin-top: 46px; margin-bottom: 50px"/>
    </keep-alive>

    <van-tabbar fixed safe-area-inset-bottom v-model="active" active-color="#fe6243" inactive-color="#707070"
                @change="onChange">
      <van-tabbar-item to="/home" :icon="active===0?'wap-home':'wap-home-o'">{{ items[0] }}</van-tabbar-item>
      <van-tabbar-item to="/project" :icon="active===1?'label':'label-o'">{{ items[1] }}</van-tabbar-item>
      <van-tabbar-item to="/tree" :icon="active===2?'cluster':'cluster-o'">{{ items[2] }}</van-tabbar-item>
      <van-tabbar-item to="/nav" :icon="active===3?'location':'location-o'">{{ items[3] }}</van-tabbar-item>
      <van-tabbar-item to="/chapter" :icon="active===4?'star':'star-o'">{{ items[4] }}</van-tabbar-item>
    </van-tabbar>

    <van-popup v-model="show" position="left" class="popup">
      <LeftMenu @clickMenuItem="showMenu(false)"/>
    </van-popup>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu";

export default {
  name: 'Main',
  data() {
    return {
      // 是否显示左侧菜单
      show: false,
      items: ['首页', '项目', '体系', '导航', '公众号'],
      // 是否点击了菜单某一项
      clicked: false,
    }
  },
  components: {LeftMenu},
  computed: {
    active: {
      get() {
        return this.$store.state.mainTabBarActive;
      },
      set(val) {
        this.$store.commit('updateMainTabBarActive', val);
      }
    }
  },
  beforeUpdate() {
    if (this.clicked) {
      this.showMenu(false);
    }
  },
  methods: {
    onChange(index) {
      console.log('item=' + index)
    },
    // 控制是否打开左侧菜单的方法
    showMenu(show) {
      this.clicked = !show;
      this.show = show;
    },
    // 打开搜素页面
    openSearchPage() {
      this.$router.push('/search')
    }
  },
}
</script>

<style scoped>
.nav-bg {
  background-color: #fe6243
}

.nav-title {
  color: #fff;
  font-size: 18px;
  margin-left: 15px;
  font-weight: bold;
  margin-top: 3px;
}

.popup {
  background: #ffffff;
  height: 100%;
  width: 60%;
}

</style>