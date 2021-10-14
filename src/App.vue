<template>
  <div id="app">
<!--        <keep-alive v-if='$route.meta.keepAlive'>-->
<!--          <router-view/>-->
<!--        </keep-alive>-->
<!--        <router-view v-if='!$route.meta.keepAlive'/>-->

    <keep-alive :include="this.$store.state.cachePages" :max="3">
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
