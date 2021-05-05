<template>
  <div>
    <MyNavBar title="搜索"/>
    <form class="search" action="/">
      <van-search
          v-model="keyword"
          :show-action="articleList.length > 0"
          placeholder="请输入关键词，多个用空格隔开"
          shape="round"
          @search="onSearch(true)"
          @cancel="onCancel"
      />
    </form>

    <div class="container">
      <div v-if="articleList.length ===0">
        <div v-if="searchHistory.length > 0">
          <span class="title">搜索记录</span>
          <span class="clear-history" @click="clearSearchHistory">清空记录</span>
          <MyTag class="my-tag" :tag-list="searchHistory" border-color="#8a8a8a" @clickTag="clickTag"/>
          <div class="line"></div>
        </div>

        <div>
          <span class="title">热门搜索</span>
          <MyTag class="my-tag" :tag-list="hotKeys" @clickTag="clickTag"/>
        </div>
      </div>

      <van-list
          v-if="articleList.length > 0"
          :finished="finished"
          v-model="loading"
          :error.sync="error"
          error-text="出错了，点击重试！"
          finished-text="我也是有底线的！"
          @load="onSearch">

        <ArticleItem v-for="item in articleList" :item="item" :key="item.id"></ArticleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import MyNavBar from "@/components/MyNavBar";
import {getRequest, postKeyValueRequest} from "@/utils/api";
import {showLoading, clearLoading} from "@/utils/toast";
import MyTag from "@/components/MyTag";
import ArticleItem from "@/components/ArticleItem";

export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
      hotKeys: [],
      finished: false,
      loading: false,
      error: false,
      pageNum: 0,
      articleList: [],
    }
  },
  components: {MyNavBar, ArticleItem, MyTag},
  mounted() {
    this.$store.commit('initSearchHistory');
    this.getHotKey();
  },
  computed: {
    searchHistory() {
      return this.$store.state.searchHistory;
    }
  },
  methods: {
    getHotKey() {
      getRequest('/hotkey/json').then(data => {
        if (data) {
          this.hotKeys = data;
        }
      })
    },
    // isEnter表示输入关键字后直接回车，而不是列表分页加载
    onSearch(isEnter) {
      if (!this.keyword) {
        this.$toast('请输入关键字！');
        return;
      }

      if (this.articleList.length === 0 || isEnter) {
        showLoading();
        // 保存搜索记录
        this.$store.commit('addSearchHistory', this.keyword);

        if (isEnter) {
          this.onCancel();
        }
      }

      postKeyValueRequest(`/article/query/${this.pageNum}/json`, {k: this.keyword}).then(data => {
        if (data) {
          if (this.pageNum === 0 && data.datas.length === 0) {
            this.$toast('未找到相关内容！');
            return;
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
      }).finally(() => {
        clearLoading();
      })
    },
    onCancel() {
      this.finished = false;
      this.loading = false;
      this.error = false;
      this.pageNum = 0;
      this.articleList = [];
    },
    clearSearchHistory() {
      this.$store.commit('clearSearchHistory');
    },
    clickTag(data) {
      this.keyword = data.name ? data.name : data;
      this.onSearch();
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px;
}

.search {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  z-index: 100;
}

.title {
  color: #707070;
  margin-left: 12px;
  font-size: 14px;
  padding-top: 10px;
}

.my-tag {
  margin-left: 10px;
}

.clear-history {
  float: right;
  color: #1f6fb5;
  font-size: 14px;
  margin-right: 12px;
}

.line {
  margin: 20px 0;
  height: 6px;
  background: #f4f4f4;
}
</style>
