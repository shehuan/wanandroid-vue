<template>
  <div>
    <MyNavBar title="收藏的文章"/>
    <van-list
        style="margin-top: 46px"
        :finished="finished"
        v-model="loading"
        :error.sync="error"
        error-text="出错了，点击重试！"
        finished-text="我也是有底线的！"
        @load="getCollectionList">

      <ArticleItem v-for="(item, index) in articleList" :item="item"
                   :key="item.id">
        <Collect :is-collected="true" :id="item.id" :is-article-list="false" :origin-id="item.originId"
                 class="collect" @unCollect="unCollect(index)"/>
      </ArticleItem>
    </van-list>
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBar";
import {getRequest} from "@/utils/api";
import Collect from "@/components/Collect";
import ArticleItem from "@/components/ArticleItem";

export default {
  name: "Collection",
  data() {
    return {
      finished: false,
      loading: false,
      error: false,
      pageNum: 1,
      articleList: []
    }
  },
  components: {MyNavBar, ArticleItem, Collect},
  methods: {
    getCollectionList() {
      getRequest('/lg/collect/list/0/json').then(data => {
        if (data) {
          // 没有收藏文章
          if (this.pageNum === 1 && data.datas.length === 0) {
            this.finished = true;
            return;
          }
          this.articleList.push(...data.datas);
          ++this.pageNum;
          this.loading = false;
          // 最后一页
          if (data.curPage === data.pageCount) {
            this.finished = true;
          }
        } else {
          this.$router.back();
        }
      }).catch(error => {
        this.loading = false;
        this.error = true;
      })
    },
    unCollect(index) {
      this.articleList.splice(index, 1)
    }
  }
}
</script>

<style scoped>

.collect {
  float: right;
  margin-right: 2px;
}
</style>