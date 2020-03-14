<template>
  <div class>
    <el-form label-width="100px">
      <el-form-item label="头像">
        <el-avatar :src="userInfo.avatar"></el-avatar>
      </el-form-item>
      <el-form-item label="用户名">{{userInfo.name}}</el-form-item>
      <el-form-item label="邮箱">{{userInfo.email}}</el-form-item>
      <el-form-item label="用户类型">{{getUserType(userInfo.identity)}}</el-form-item>
      <el-form-item label="注册日期">{{$datetime.formatDatetime(userInfo.date)}}</el-form-item>
      <el-form-item>
        <router-link :to="{name: 'UserEdit'}">
          <el-button>编辑</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserType } from "./index.js";
import { getUserInfo } from "@/api/user.js";

export default {
  name: "UserInfo",

  data() {
    return {
      getUserType,

      // 用户信息
      userInfo: {
        id: "",
        avatar: "",
        name: "",
        email: "",
        identity: ""
      }
    };
  },

  methods: {
    async getData() {
      const id = this.$store.getters.user.id;
      const res = await getUserInfo(id);
      this.userInfo = res.data;
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
</style>