<template>
  <div class="register">
    <h1>注册</h1>

    <div class="register-box">
      <el-form ref="registerForm" status-icon :model="form" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="form.identity">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="onSubmit('registerForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  props: [],

  components: {},

  data() {
    // 自定义校验规则
    var validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      form: {
        name: "user",
        email: "user1@email.com",
        password: "123456",
        confirmPassword: "123456",
        identity: ""
      },

      /**
       * 校验规则
       * https://github.com/yiminghe/async-validator
       */
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
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
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateConfirmPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async register() {
      const res = await this.$axios.post("/api/users/register", this.form);
      console.log(res);

      if (res.code == 0) {
        this.$message.success("注册成功");
      } else {
        this.$message.error(res.msg);
      }
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },

  created() {}
};
</script>

<style scoped>
.register {
  width: 400px;
  margin: 0 auto;
  padding-top: 50px;
}
.register h1 {
  font-size: 30px;
  text-align: center;
  line-height: 60px;
}
.submit-btn {
  width: 100%;
}
</style>