<template>
  <div>
    <van-tabs v-model="active" swipeable sticky :offset-top="46" title-active-color="#fe6243" color="#fe6243"
              background="#f4f4f4">
      <van-tab v-for="(type, index) in projectTypes" :title="type.name | format" :key="type.id">
        <van-list
            :finished="finisheds[index]"
            v-model="loadings[index]"
            :error.sync="errors[index]"
            error-text="出错了，点击重试！"
            finished-text="我也是有底线的！"
            @load="getProjectList">
          <div v-for="item in projectLists[index]" :key="item.id" class="van-hairline--bottom item"
               @click="toArticlePage(item.link)">
            <van-image class="left-image" lazy-load :src="item.envelopePic"/>
            <div class="right-content">
              <div class="van-multi-ellipsis--l2" v-html="item.title"/>
              <div class="van-multi-ellipsis--l2 desc" v-html="item.desc"></div>
              <div class="bottom">
                <van-tag color="#25c6fc" plain v-if="item.author" class="author">{{ item.author }}</van-tag>
                <span class="date">{{ item.niceDate }}</span>
              </div>
              <Collect :is-collected="item.collect" :id="item.id" class="collect" @doCollect="doCollect(item)"/>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {getRequest} from "@/utils/api";
import Vue from 'vue';
import Collect from "@/components/Collect";

export default {
  name: "Project",
  data() {
    return {
      active: 0,
      finisheds: {},
      loadings: {},
      errors: {},
      projectTypes: [],
      pageNums: {},
      projectLists: {}
    }
  },
  components: {Collect},
  mounted() {
    this.initProjectTypes();
  },
  filters: {
    // 处理分类名称
    format(value) {
      return value.replace('&amp;', '&')
    }
  },
  methods: {
    // 请求项目分类
    initProjectTypes() {
      getRequest('/project/tree/json').then(data => {
        if (data) {
          this.projectTypes = data;
          this.projectTypes.unshift({name: '最新项目', id: -1})
          for (let i = 0; i < this.projectTypes.length; i++) {
            Vue.set(this.finisheds, this.active, false)
            Vue.set(this.loadings, this.active, false)
            Vue.set(this.errors, this.active, false)
            this.pageNums[i] = 1;
            this.projectLists[i] = [];
          }
        }
      })
    },
    // 请求分类下的项目列表
    getProjectList() {
      let pageNum = this.pageNums[this.active]
      let cid = this.projectTypes[this.active].id;

      console.log(`当前分类==>${this.active}当前页==>${pageNum}`)

      let url = cid !== -1 ? `/project/list/${pageNum}/json?cid=${cid}` : `/article/listproject/${pageNum}/json`;
      getRequest(url).then(data => {
        if (data) {
          this.projectLists[this.active].push(...data.datas);
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
    },
    doCollect(item) {
      Vue.set(item, 'collect', !item.collect)
      this.$forceUpdate()
    },
    toArticlePage(link) {
      window.open(link, '_blank')
    }
  },
}
</script>

<style scoped>
.item {
  height: 140px;
  box-sizing: border-box;
  padding: 10px 10px;
  display: flex;
}

.item > .left-image {
  width: 70px;
}

.item > .right-content {
  position: relative;
  margin-left: 15px;
  flex: 1;
}

.right-content > .desc {
  color: #8a8a8a;
  font-size: 12px;
  margin-top: 10px;
}

.right-content > .bottom {
  position: absolute;
  bottom: 0;
}

.bottom > .author {
  margin-right: 10px;
}

.bottom > .date {
  font-size: 12px;
  color: #bfbfbf;
}

.collect {
  right: 2px;
  bottom: 0;
  position: absolute;
}
</style>