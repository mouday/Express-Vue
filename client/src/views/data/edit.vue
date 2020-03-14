<template>
  <div class>
    <el-page-header @back="goBack"></el-page-header>

    <div style="margin-top:20px">
      <DataAdd />
    </div>
  </div>
</template>

<script>
import DataAdd from "./add.vue";

export default {
  name: "DataEdit",

  components: { DataAdd },

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

