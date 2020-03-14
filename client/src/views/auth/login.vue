<template>
  <div class="login">
    <h1>登录</h1>

    <div class="register-box">
      <el-form ref="loginForm" :rules="rules" status-icon :model="loginForm" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" type="email"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            @keyup.enter.native="onSubmit('loginForm')"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="onSubmit('loginForm')">登录</el-button>
          <p>
            还没有账号？现在
            <router-link to="/register">
              <el-button type="text">注册</el-button>
            </router-link>
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import { isEmpty } from "@/uitls";
import { userLogin } from "@/api/auths";

export default {
  name: "login",

  props: [],

  components: {},

  data() {
    return {
      // 表单数据
      loginForm: {
        email: "",
        password: ""
      },

      /**
       * 校验规则
       * https://github.com/yiminghe/async-validator
       */
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async login() {
      const res = await userLogin(this.loginForm);

      if (res.code == 0) {
        const token = res.token;

        // 存储到本地
        localStorage.setItem("token", token);

        // 存储到vuex
        this.$store.dispatch("setToken", token);

        // 跳转
        this.$message.success("登录成功");
        this.$router.push({ name: "Index" });
      } else {
        this.$message.error(res.msg);
      }
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$message.error("请填写正确的信息！");
        }
      });
    }
  },

  created() {}
};
</script>

<style scoped>
.login {
  width: 400px;
  margin: 0 auto;
  padding-top: 50px;
}
.login h1 {
  font-size: 30px;
  text-align: center;
  line-height: 60px;
}
.submit-btn {
  width: 100%;
}
</style>