<template>
  <div class>
    <BaseHeader />

    <div class="body">
      <div class="base-siderbar">
        <BaseSiderbar />
      </div>

      <div class="base-container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="$route.name!='Index'">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="app-container">
          <!-- Vue相同路由参数不同不会刷新的问题 -->
          <router-view :key="$route.fullPath"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "./BaseHeader";
import BaseSiderbar from "./BaseSiderbar";

export default {
  name: "",

  props: [],

  components: { BaseHeader, BaseSiderbar },

  data() {
    return {};
  },

  computed: {},

  methods: {},

  created() {}
};
</script>

<style scoped>
.body {
  display: flex;
}

.base-siderbar {
  position: absolute;
  top: 51px;
  bottom: 0;

  border-right: solid 1px #e6e6e6;
}

.base-container {
  position: relative;
  left: 161px;
  width: calc(100% - 171px);
  margin-top: 10px;
  /* background: green; */
}
.app-container {
  margin-top: 20px;
}
</style>