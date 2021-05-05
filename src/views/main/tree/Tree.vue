<template>
  <van-list
      :finished="finished"
      v-model="loading"
      :error.sync="error"
      error-text="出错了，点击重试！"
      finished-text="我也是有底线的！"
      @load="getTreeList">
    <div v-for="item in treeList" :key="item.id" class="item" @click="toTreeDetail(item)">
      <div class="content">
        <div>{{ item.name }}</div>
        <div class="children">
          <span class="child" v-for="child in item.children">{{ child.name }}</span>
        </div>
      </div>
      <van-icon name="arrow" color="#bfbfbf"/>
    </div>
  </van-list>
</template>

<script>
import {getRequest} from "@/utils/api";

export default {
  name: "Tree",
  data() {
    return {
      finished: false,
      loading: false,
      error: false,
      treeList: []
    }
  },
  methods: {
    getTreeList() {
      getRequest('/tree/json').then(data => {
        if (data) {
          this.treeList = data;
          this.loading = false;
          this.finished = true;
        }
      }).catch(error => {
        this.loading = false;
        this.error = true;
      })
    },
    toTreeDetail(item) {
      let articleTypes = []
      item.children.forEach(child => {
        articleTypes.push({name: child.name, id: child.id})
      });
      localStorage.setItem('currentTree', JSON.stringify({articleTypes: articleTypes, treeName: item.name}))
      this.$router.push('/tree/detail')
    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 4px #eeeef5 solid;
}

.item .content {
  flex: 1;
  margin-right: 10px;
}

.content > .children {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}

.children > .child {
  font-size: 13px;
  color: #8a8a8a;
  margin-top: 10px;
  margin-right: 15px;
}
</style>