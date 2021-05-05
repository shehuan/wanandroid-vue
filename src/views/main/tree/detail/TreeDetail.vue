<template>
  <div>
    <MyNavBar :title="currentTree.treeName" v-if="currentTree"/>
    <van-tabs v-model="active" :ellipsis="false" swipeable sticky :offset-top="46" title-active-color="#fe6243"
              color="#fe6243"
              background="#f4f4f4">
      <van-tab v-for="(type, index) in currentTree.articleTypes" :title="type.name" :key="type.id"
               style="margin-top: 46px" v-if="currentTree">
        <van-list
            :finished="finisheds[index]"
            v-model="loadings[index]"
            :error.sync="errors[index]"
            error-text="出错了，点击重试！"
            finished-text="我也是有底线的！"
            @load="getArticleList">

          <ArticleItem v-for="item in articleLists[index]" :item="item" :force-update="true"
                       :key="item.id"></ArticleItem>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import {getRequest} from "@/utils/api";
import Vue from "vue";
import MyNavBar from "@/components/MyNavBar";
import ArticleItem from "@/components/ArticleItem";
import Collect from "@/components/Collect";

export default {
  name: 'TreeDetail',
  data() {
    return {
      active: 0,
      finisheds: {},
      loadings: {},
      errors: {},
      currentTree: {articleTypes: [], treeName: ''},
      pageNums: {},
      articleLists: {}
    }
  },
  components: {MyNavBar, ArticleItem, Collect},
  mounted() {
    this.currentTree = JSON.parse(localStorage.getItem('currentTree'));

    for (let i = 0; i < this.currentTree.articleTypes.length; i++) {
      Vue.set(this.finisheds, this.active, false)
      Vue.set(this.loadings, this.active, false)
      Vue.set(this.errors, this.active, false)
      this.pageNums[i] = 0;
      this.articleLists[i] = [];
    }
  },
  destroyed() {
    localStorage.removeItem('currentTree')
  },
  // 下边两个方法结合起来，可以监听vuex中state状态数据的变化
  // computed: {
  //   currentTree() {
  //     return this.$store.state.currentTree;
  //   }
  // },
  // watch: {
  //   currentTree: function () {
  //     this.resetData();
  //   }
  // },
  methods: {
    // 请求分类下的项目列表
    getArticleList() {
      if (!this.currentTree) {
        return;
      }

      let pageNum = this.pageNums[this.active]
      let cid = this.currentTree.articleTypes[this.active].id;

      console.log(`当前分类==>${this.active}当前页==>${pageNum}`)

      let url = `/article/list/${pageNum}/json?cid=${cid}`;
      getRequest(url).then(data => {
        if (data) {
          this.articleLists[this.active].push(...data.datas);
          this.pageNums[this.active] = pageNum + 1;
          Vue.set(this.loadings, this.active, false)
          if (data.curPage === data.pageCount) {
            Vue.set(this.finisheds, this.active, true)
          }
        }
      }).catch(error => {
        Vue.set(this.loadings, this.active, false)
        Vue.set(this.errors, this.active, true)
      })
    }
  }
}
</script>

<style scoped>

</style>
