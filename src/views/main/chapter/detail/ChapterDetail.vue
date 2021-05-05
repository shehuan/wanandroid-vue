<template>
  <div>
    <MyNavBar :title="chapterName"/>
    <van-list
        style="margin-top: 46px"
        :finished="finished"
        v-model="loading"
        :error.sync="error"
        error-text="出错了，点击重试！"
        finished-text="我也是有底线的！"
        @load="getArticleList">

      <ArticleItem v-for="item in articleList" :item="item" :key="item.id"></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import {getRequest} from "@/utils/api";
import MyNavBar from "@/components/MyNavBar";
import ArticleItem from "@/components/ArticleItem";

export default {
  name: "ChapterDetail",
  data() {
    return {
      chapterName: '',
      chapterId: -1,
      finished: false,
      loading: false,
      error: false,
      pageNum: 1,
      articleList: []
    }
  },
  components: {MyNavBar, ArticleItem},
  mounted() {
    this.chapterName = this.$route.query.name;
    this.chapterId = this.$route.query.id;
  },
  methods: {
    getArticleList() {
      console.log('当前页==>' + this.pageNum)
      let url = `/wxarticle/list/${this.chapterId}/${this.pageNum}/json`;
      getRequest(url).then(data => {
        if (data) {
          // 给列表赋值
          this.articleList.push(...data.datas);
          ++this.pageNum;
          this.loading = false;
          // 最后一页
          if (data.curPage === data.pageCount) {
            this.finished = true;
          }
        }
      }).catch(error => {
        this.loading = false;
        this.error = true;
      })
    }
  }
}
</script>

<style scoped>

</style>