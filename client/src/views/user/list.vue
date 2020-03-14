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
          <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList } from "@/api/user.js";
import { getUserType } from "./index.js";

export default {
  name: "",

  props: [],

  components: {},

  data() {
    return {
      // 用户列表
      userList: [],
      getUserType
    };
  },

  computed: {},

  methods: {
    async getData() {
      const res = await getUserList();
      this.userList = res.data;
    },

    handleEdit(id) {
      this.$router.push({ name: "UserEdit", query: { id: id } });
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
</style>