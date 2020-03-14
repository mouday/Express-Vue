<template>
  <div class="app-container">
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号" type="index" width="60" header-align="center" align="center"></el-table-column>
      <el-table-column
        label="时间"
        prop="publish_time"
        width="180"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{ $datetime.formatDatetime(scope.row.publish_time) }}</template>
      </el-table-column>
      <el-table-column label="标题" prop="title" width="180" header-align="center"></el-table-column>
      <el-table-column label="内容" prop="content" header-align="center"></el-table-column>

      <el-table-column label="操作" header-align="center" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="getData"
    ></el-pagination>
  </div>
</template>

<script>
import moment from "moment";
import { getArticleList, deleteArticle } from "@/api/articles";

export default {
  name: "DataList",

  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      moment
    };
  },

  methods: {
    async getData() {
      const params = {
        page: this.currentPage,
        size: this.pageSize
      };

      const res = await getArticleList(params);
      this.list = res.data.list;
      this.total = res.data.count;
    },

    async deleteRow(id) {
      const res = await deleteArticle(id);

      if (res.code == 0) {
        this.$message.success("删除成功！");
        this.getData();
      } else {
        this.$message.error(res.msg);
      }
    },

    handleDelete(id) {
      // 删除确认
      this.$confirm("即将删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRow(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    handleEdit(id) {
      this.$router.push({ name: "DataEdit", query: { id: id } });
    }
  },

  created() {
    this.getData();
  }
};
</script>
