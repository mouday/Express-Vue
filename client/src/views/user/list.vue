<template>
  <div class>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column label="序号" type="index" width="60" header-align="center" align="center"></el-table-column>

      <el-table-column label="用户名" prop="name" width="180" header-align="center">
        <template slot-scope="scope">
          <span style="display: flex; line-height: 30px;">
            <el-avatar :src="scope.row.avatar" :size="30"></el-avatar>
            <span style="margin-left:10px;">{{scope.row.name}}</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" prop="email" header-align="center"></el-table-column>
      <el-table-column label="用户类型" prop="email" header-align="center">
        <template slot-scope="scope">{{getUserType(scope.row.identity)}}</template>
      </el-table-column>
      <el-table-column label="注册时间" prop="date" width="180" header-align="center" align="center">
        <template slot-scope="scope">{{ $datetime.formatDatetime(scope.row.date) }}</template>
      </el-table-column>

      <el-table-column
        label="操作"
        header-align="center"
        width="150"
        v-if="$hasPermission(['manager'])"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            :disabled="isMySelf(scope.row.id)"
          >删除</el-button>
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
import { getUserList, deleteUser } from "@/api/user.js";
import { getUserType } from "./index.js";

export default {
  name: "UserList",

  data() {
    return {
      getUserType,

      // 用户列表
      userList: [],
      total: 0,
      currentPage: 1,
      pageSize: 5
    };
  },

  methods: {
    async getData() {
      const params = {
        page: this.currentPage,
        size: this.pageSize
      };

      const res = await getUserList(params);
      this.userList = res.data.list;
      this.total = res.data.count;
    },

    handleEdit(id) {
      this.$router.push({ name: "UserEdit", query: { id: id } });
    },

    async handleDelete(id) {
      const res = await deleteUser(id);

      if (res.code == 0) {
        this.$message.success(res.msg);
        this.getData();
      } else {
        this.$message.error(res.msg);
      }
    },

    isMySelf(id) {
      return this.$store.getters.user.id == id;
    }
  },

  created() {
    this.getData();
  }
};
</script>

