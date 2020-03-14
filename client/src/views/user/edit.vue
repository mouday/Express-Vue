<template>
  <div class="data-edit">
    <el-page-header @back="goBack"></el-page-header>

    <el-form label-width="100px" :model="userInfo" ref="dataForm" class="data-add">
      <el-form-item label="头像">
        <el-avatar :src="userInfo.avatar"></el-avatar>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="用户类型">
        <!-- <span v-role="['employee']">{{getUserType(userInfo.identity)}}</span> -->

        <el-select v-model="userInfo.identity">
          <template v-for="item in userTypes">
            <el-option :label="item.label" :value="item.value" :key="item.id"></el-option>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item label="注册日期">{{$datetime.formatDatetime(userInfo.date)}}</el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('dataForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo, setUserInfo } from "@/api/user.js";
import { userTypes } from "./index";

export default {
  name: "",

  props: [],

  components: {},

  data() {
    return {
      userTypes,

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

  computed: {},

  methods: {
    async getData() {
      const res = await getUserInfo(this.userInfo.id);
      this.userInfo = res.data;
    },

    async updateSelfInfo() {
      const res = await getUserInfo(this.userInfo.id);

      this.$store.dispatch("setUser", res.data);
    },

    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await setUserInfo(this.userInfo);
          if (res.code == 0) {
            this.$message.success("用户信息更新成功！");

            // 如果修改的是自己的信息，更新一下
            if (this.userInfo.id == this.$store.getters.user.id) {
              this.updateSelfInfo();
            }
          } else {
            this.$message.error(res.msg);
          }
        } else {
          this.$message.error("请填写正确的信息！");
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },

  created() {
    this.userInfo.id = this.$route.query.id || this.$store.getters.user.id;
    this.getData();
  }
};
</script>

<style scoped>
.data-edit {
  width: 400px;
}
</style>