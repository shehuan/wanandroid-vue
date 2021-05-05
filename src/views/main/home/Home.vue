<template>
  <van-pull-refresh
      v-model="isPullRefresh"
      success-text="刷新成功"
      @refresh="onPullRefresh">
    <van-list
        :finished="finished"
        v-model="loading"
        :error.sync="error"
        error-text="出错了，点击重试！"
        finished-text="我也是有底线的！"
        @load="getArticleList">
      <template #default>
        <van-swipe :autoplay="3000" @change="onChange" v-if="banners.length > 0">
          <van-swipe-item v-for="(item, index) in banners" :key="index" @click="toArticlePage(item.url)">
            <van-image class="swipe-image" lazy-load fit="fill" :src="item.imagePath"/>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              <span class="title van-ellipsis">{{ banners[current].title }}</span>
              <span>{{ current + 1 }}/{{ banners.length }}</span>
            </div>
          </template>
        </van-swipe>

        <ArticleItem v-for="item in articleList" :item="item" :key="item.id"></ArticleItem>
      </template>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import {getRequest} from "@/utils/api";
import Collect from "@/components/Collect";
import ArticleItem from "@/components/ArticleItem";

export default {
  name: "Home",
  data() {
    return {
      isPullRefresh: false,
      current: 0,
      banners: [],
      finished: false,
      loading: false,
      error: false,
      pageNum: 0,
      articleList: []
    };
  },
  components: {Collect, ArticleItem},
  mounted() {
    this.initBanner();
  },
  methods: {
    // banner切换
    onChange(index) {
      this.current = index;
    },
    initBanner() {
      getRequest('/banner/json').then(data => {
        if (data) {
          this.banners = data;
        }
      })
    },
    getArticleList() {
      console.log('当前页==>' + this.pageNum)

      let url = `/article/list/${this.pageNum}/json`;
      getRequest(url).then(data => {
        if (data) {
          if (this.isPullRefresh) {
            this.articleList = [];
            this.isPullRefresh = false;
          }

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
    },
    // 下拉刷新回调
    onPullRefresh() {
      this.finished = false;
      this.loading = true;
      this.pageNum = 0;
      this.getArticleList();
    }
  },
}
</script>

<style scoped>
.custom-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  bottom: 0;
  font-size: 13px;
  padding: 6px 5px;
  background: rgba(0, 0, 0, 0.4);
}

.custom-indicator > span {
  color: #fff;
}

.swipe-image{
  height: 200px; width: 100%;
}

.custom-indicator > .title {
  width: 90%;
}
</style>