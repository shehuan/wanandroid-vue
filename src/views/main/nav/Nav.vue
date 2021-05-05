<template>
  <div class="container">
    <van-sidebar class="sidebar" v-model="activeKey">
      <van-sidebar-item v-for="(item, index) in items" :title="item" :key="index"></van-sidebar-item>
    </van-sidebar>

    <div class="right-content">
      <!--      <div class="tags">-->
      <!--        <span class="tag" v-for="(item, index) in websites[activeKey]" :key="index"-->
      <!--              @click="toArticlePage(item.link)">{{ item.name | format }}</span>-->
      <!--      </div>-->
      <MyTag :tag-list="websites[activeKey]" @clickTag="toArticlePage"/>
      <!--避免tag不满一页被拉伸，用来占位-->
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
import {getRequest} from "@/utils/api";
import {clearLoading, showLoading} from "@/utils/toast";
import MyTag from "@/components/MyTag";

export default {
  name: "Nav",
  data() {
    return {
      activeKey: 0,
      items: [],
      websites: {}
    }
  },
  components: {MyTag},
  mounted() {
    this.getNaviList();
  },
  filters: {
    format(value) {
      return value.replace('&amp;', '&')
    }
  },
  methods: {
    getNaviList() {
      showLoading();
      getRequest('/friend/json').then(data => {
        if (data && data instanceof Array) {
          this.websites[0] = []
          data.forEach(d => {
            this.websites[0].push({name: d.name, link: d.link})
          })
        }
        this.items.unshift('热门网站');
      }).finally(() => {
        clearLoading();
      });
      getRequest('/navi/json').then(data => {
        if (data && data instanceof Array) {
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i].name);
            this.websites[i + 1] = [];
            data[i].articles.forEach(a => {
              this.websites[i + 1].push({name: a.title, link: a.link})
            })
          }
        }
      })
    },
    toArticlePage(data) {
      window.open(data.link, '_blank')
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
}

.container > .sidebar {
  width: 100px;
  overflow-y: scroll;
  position: fixed;
  bottom: 50px;
  top: 46px;
}

.container > .right-content {
  position: fixed;
  overflow-y: scroll;
  flex: 1;
  padding: 0 15px 15px 15px;
  margin-left: 100px;
  bottom: 50px;
  top: 46px
}

.right-content > .tags {
  display: flex;
  flex-wrap: wrap;
}

.tags > .tag {
  font-size: 14px;
  margin-top: 15px;
  margin-right: 15px;
  padding: 5px 15px;
  color: #2c2c2c;
  border-radius: 30px;
  border: 1px solid #fe6243;
}

.right-content > .empty {
  flex: 1;
}
</style>