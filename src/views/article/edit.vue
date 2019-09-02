<template>
  <div class="article">
    <div v-if="cover" class="cover">
      <img :src="'http://qiniu1.qihuanrobot.com/' + cover" />
    </div>
    <div class="top">
      <el-input v-model="title" auto-complete="off" placeholder="请输入标题" />
      <el-select v-model="type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-upload
        class="upload-box"
        action="//up.qbox.me/"
        :data="form"
        :on-success="handleSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handleSubmit">提交</el-button>
    </div>
    <div ref="refMonaco" class="monaco" />
  </div>
</template>
<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
import { addArticle, updateArticle, getArticleDetail } from "@/api/article";
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      type: "",
      cover: "",
      editor: null,
      id: this.$route.params.id,
      form: {
        token:
          "ULwZ56pyKQdbcjlulk2z_LfFFKAmKcWxojDLc9f4:uqx1mTMqQn-C-yVYllN0ojFHA5Q=:eyJzY29wZSI6InRlc3N5c3RlbSIsImRlYWRsaW5lIjoxNTYzMzQ4NjA1fQ=="
      },
      options: [
        { label: "Web开发", value: "web" },
        { label: "NodeJs", value: "node" },
        { label: "性能优化", value: "optimize" },
        { label: "项目总结", value: "summary" }
      ]
    };
  },
  created() {
    axios.get("https://api.qihuanrobot.com/file/getQNToken").then(res => {
      this.form = {
        token: res.data.data
      };
    });
  },
  mounted() {
    this.id && this._getArticleDetail();
    this.editor = monaco.editor.create(this.$refs.refMonaco, {
      value: this.content,
      language: "markdown"
    });
  },
  methods: {
    handleSubmit() {
      const content = this.editor.getValue();
      if (this.id) {
        updateArticle(this.id, {
          title: this.title,
          content: content,
          type: this.type,
          cover: this.cover
        }).then(res => {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
          this.$router.push({
            path: `/article/list`
          });
        });
        return;
      }
      addArticle({
        title: this.title,
        content: content,
        type: this.type,
        cover: this.cover
      }).then(res => {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this.$router.push({
          path: `/article/list`
        });
      });
    },
    handleCancel() {
      this.$router.push({
        path: `/article/list`
      });
    },
    handleSuccess(res, file) {
      this.cover = res.key;
    },
    _getArticleDetail() {
      getArticleDetail(this.id).then(res => {
        this.title = res.title;
        this.cover = res.cover;
        this.type = res.type;
        this.editor.setValue(res.content);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.article {
  padding: 25px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .cover {
    position: absolute;
    right: 30px;
    top: 6px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .top {
    margin-bottom: 20px;
    .el-input {
      width: 271px;
    }
    .upload-box {
      display: inline-block;
    }
  }
  .monaco {
    position: absolute;
    top: 85px;
    bottom: 25px;
    left: 25px;
    right: 25px;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
}
</style>

