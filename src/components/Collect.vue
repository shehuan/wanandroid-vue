<template>
  <van-icon name="like" :color="color" @click.stop="doCollect"/>
</template>

<script>
import {postKeyValueRequest, postRequest} from "@/utils/api";
import {clearLoading, showLoading} from "@/utils/toast";

export default {
  name: "Collect",
  props: {
    isArticleList: {
      type: Boolean,
      default: true
    },
    isCollected: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: -1
    },
    originId: {
      type: Number,
      default: -1
    }
  },
  computed: {
    color: function () {
      return this.isCollected ? '#f00' : '#bfbfbf';
    }
  },
  methods: {
    doCollect() {
      if (this.$store.state.userInfo.nickname === '登录') {
        this.$toast('请先登录！');
        return;
      }
      showLoading();
      if (this.isCollected) {
        // 取消收藏
        if (this.isArticleList) {
          // 在文章列表取消收藏
          postRequest(`/lg/uncollect_originId/${this.id}/json`).then(data => {
            this.$emit('doCollect')
          }).finally(() => {
            clearLoading();
          })
        } else {
          // 在收藏页面取消收藏
          postKeyValueRequest(`/lg/uncollect/${this.id}/json`, {originId: this.originId}).then(data => {
            this.$emit('unCollect')
          }).finally(() => {
            clearLoading();
          })
        }
      } else {
        // 收藏
        postRequest(`/lg/collect/${this.id}/json`).then(data => {
          this.$emit('doCollect')
        }).finally(() => {
          clearLoading();
        })
      }
    }
  }
}
</script>

<style scoped>

</style>