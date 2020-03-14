<template>
  <div class="base-header">
    <!-- 左边logo -->
    <div>后台管理</div>

    <!-- 右边信息 -->
    <div class="base-header-right">
      <el-avatar :src="user.avatar" :size="30"></el-avatar>

      <span>{{user.name}}</span>

      <!-- 下拉框 -->
      <el-dropdown @command="handleCommand" size="medium">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">用户信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { types } from "../store";
import { isEmpty } from "../uitls";

export default {
  name: "",

  props: [],

  components: {},
  computed: {
    user() {
      return this.$store.getters.user || {};
    }
  },

  data() {
    return {};
  },

  methods: {
    logout() {
      // 清除token
      localStorage.removeItem("token");
      this.$store.dispatch("removeToken");

      // 页面跳转
      this.$router.push("/login");
    },

    handleCommand(item) {
      console.log(item);

      switch (item) {
        case "logout":
          this.logout();
          break;
        case "userInfo":
          this.$router.push({ name: "UserInfo" });
          break;

        default:
          break;
      }
    }
  },

  created() {}
};
</script>

<style scoped>
.base-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #444444;
  line-height: 30px;
  color: white;
}

.base-header-right {
  display: flex;
  line-height: 30px;
}
.base-header-right span {
  margin-left: 10px;
}
.el-dropdown-link {
  color: white;
}
</style>