<template>
  <div class="article">
    <el-top :keywords="keywords" @onSearch="handleSearch">
      <el-button @click="handleAddClassify">添加标签</el-button>
    </el-top>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="标题" />
      <el-table-column prop="createdAt" label="时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="标签" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="名字">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ElTop from "@/components/Top";
import { formatTime } from "@/utils";
import { getClassifyList, addClassify, deleteById } from "@/api/classify";

export default {
  components: { ElTop },
  data() {
    return {
      keywords: "",
      tableData: [],
      loading: false,
      name: "",
      dialogFormVisible: false
    };
  },
  created() {
    this._getArticleList();
  },
  methods: {
    _getArticleList() {
      getClassifyList().then(res => {
        this.tableData = res.data;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].createdAt = formatTime(
            new Date(this.tableData[i].createdAt).getTime(),
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        }
      });
    },
    handleSearch() {},
    handleAddClassify() {
      this.dialogFormVisible = true;
    },
    handleOk() {
      if (!this.name) {
         this.$message({
          type: "warning",
          message: "添加成功!"
        });
        return
      };
      addClassify({ name: this.name, type: 1 }).then(res => {
        this.$message({
          type: "success",
          message: "添加成功!"
        });
        this._getArticleList();
        this.dialogFormVisible = false;
      })
    },
    handleDelete(index, item) {
      this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          deleteById(item._id)
            .then(res => {
              this.loading = false;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this._getArticleList();
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.article {
  padding: 25px;
}
</style>
