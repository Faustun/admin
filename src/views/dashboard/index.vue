<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  mounted() {
    document.querySelectorAll("pre").forEach(block => {
      console.log(block);
      hljs.highlightBlock(block);
    });
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
