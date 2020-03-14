<template>
  <el-form :model="dataForm" label-width="60px" ref="dataForm" class="data-add">
    <el-form-item label="时间" prop="publish_time">
      <el-date-picker
        type="datetime"
        placeholder="选择日期"
        v-model="dataForm.publish_time"
        style="width: 100%;"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="内容" prop="content">
      <el-input v-model="dataForm.content" type="textarea" rows="5"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('dataForm')">提交</el-button>
      <el-button @click="resetForm('dataForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from "moment";

export default {
  name: "DataAdd",

  data() {
    return {
      dataForm: {
        _id: "",
        publish_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        title: "",
        content: ""
      }
    };
  },

  methods: {
    async getData() {
      const res = await this.$axios.get(
        "/api/articles/get/" + this.dataForm._id
      );

      if (res.code == 0) {
        this.dataForm = res.data;
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/articles/add", this.dataForm).then(res => {
            // console.log(res);
            if (res.code == 0) {
              // 没有id的会添加，有id的会修改，给出不同的提示
              if (!this.dataForm._id) {
                this.$message.success("添加成功");

                this.$router.push({
                  name: "DataAdd",
                  query: { uid: res.data._id }
                });
              } else {
                this.$message.success("修改成功");
              }
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

  created() {
    this.dataForm._id = this.$route.query.uid;

    if (this.dataForm._id) {
      this.getData();
    }
  }
};
</script>

<style  scoped>
.data-add {
  width: 400px;
}
</style>