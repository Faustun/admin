<template>
  <div class="Pull__top">
    <slot></slot>
    <div class="Pull__search-box">
      <el-input
        placeholder="请输入关键字"
        @keyup.enter.native="handleSearch"
        prefix-icon="el-icon-search"
        v-model="keywordsData"
      ></el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywordsData: this.keywords
    };
  },
  props: {
    keywords: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleSearch() {
      this.$emit("onSearch", this.keywordsData);
    }
  }
};
</script>
<style lang="scss" scoped>
.Pull__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.Pull__search-box {
  width: 300px;
}
</style>
