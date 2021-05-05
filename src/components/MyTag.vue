<template>
  <div class="tags">
        <span class="tag" v-for="(item, index) in tagList" :key="index"
              v-bind:style="{border:`1px solid ${borderColor}`}"
              @click="clickTag(item)">{{ item.name ? item.name : item | format }}</span>
  </div>
</template>

<script>
export default {
  name: "MyTag",
  props: {
    tagList: {
      type: Array,
      default: []
    },
    borderColor: {
      type: String,
      default: '#fe6243'
    },
  },
  filters: {
    format(value) {
      return value.replace('&amp;', '&')
    }
  },
  methods: {
    clickTag(data) {
      this.$emit('clickTag', data)
    }
  }
}
</script>

<style scoped>
.tags {
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
}
</style>