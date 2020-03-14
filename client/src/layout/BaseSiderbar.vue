<template>
  <div class>
    <el-menu :router="true">
      <el-menu-item index="0" :route="{name: 'Index'}">
        <i class="el-icon-location"></i>
        <span>首页</span>
      </el-menu-item>

      <template v-for="(item, index) in $router.options.routes">
        <el-submenu
          :key="index"
          :index="item.name"
          v-if="$hasPermission(item.meta.roles) && (!item.meta.hidden)"
          :router="true"
        >
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>

          <template v-for="(citem, cindex) in item.children">
            <el-menu-item
              :key="cindex"
              v-if="$hasPermission(citem.meta.roles) && (!citem.meta.hidden)"
              :route="{name: citem.name}"
              :index="citem.name"
            >{{citem.meta.title}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  created() {
    console.log(this.$router);
  }
};
</script>

<style scoped>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */

.el-menu,
.el-submenu .el-menu-item {
  width: 150px;
  min-width: 150px;
}

.el-menu {
  border-right: none;
}
</style>