<template>
  <div class="van-hairline--bottom item" @click="toArticlePage(item.link)">
    <div class="van-multi-ellipsis--l2" v-html="item.title"/>
    <div>
      <van-tag color="#51c422" plain v-if="item.tags && item.tags[0]" class="tag">{{ item.tags[0].name }}</van-tag>
      <van-tag color="#25c6fc" plain v-if="item.author" class="author">{{ item.author }}</van-tag>
      <span class="date">{{ item.niceDate }}</span>
      <slot>
        <Collect :is-collected="item.collect" :id="item.id" class="collect" @doCollect="doCollect()"/>
      </slot>
    </div>
  </div>
</template>

<script>
import Collect from "@/components/Collect";
import Vue from "vue";

export default {
  name: "ArticleItem",
  components: {Collect},
  props: {
    item: Object,
    forceUpdate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doCollect() {
      Vue.set(this.item, 'collect', !this.item.collect)
      if (this.forceUpdate) {
        this.$forceUpdate()
      }
    },
    toArticlePage(link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style scoped>
.item {
  height: 100px;
  box-sizing: border-box;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.author,
.tag {
  margin-right: 10px;
}

.date {
  font-size: 12px;
  color: #bfbfbf;
}

.collect {
  float: right;
  margin-right: 2px;
}
</style>