<template>
  <div class="container">
    <div v-for="item in chapters" :key="item.id" class="item" @click="toChapterDetail(item.name, item.id)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import {getRequest} from "@/utils/api";
import {clearLoading, showLoading} from "@/utils/toast";

export default {
  name: "Chapter",
  data() {
    return {
      chapters: []
    }
  },
  mounted() {
    this.getChapters();
  },
  methods: {
    getChapters() {
      showLoading();
      getRequest('/wxarticle/chapters/json').then(data => {
        if (data) {
          this.chapters = data;
        }
      }).finally(() => {
        clearLoading();
      });
    },
    toChapterDetail(name, id) {
      this.$router.push({name: 'ChapterDetail', query: {name: name, id: id}})
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap
}

.item {
  width: 50%;
  height: 110px;
  line-height: 120px;
  text-align: center;
  color: #2c2c2c;
}

.item:nth-child(6n + 1) {
  background-color: #9dd3fa;
}

.item:nth-child(6n + 2) {
  background-color: #f7f7d0;
}

.item:nth-child(6n + 3) {
  background-color: #ffc09f;
}

.item:nth-child(6n + 4) {
  background-color: #a0d8de;
}

.item:nth-child(6n + 5) {
  background-color: #e2dbbe;
}

.item:nth-child(6n + 6) {
  background-color: #eae1f0;
}

</style>