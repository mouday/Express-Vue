<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import { isEmpty } from "./uitls";
import { types } from "./store";

export default {
  name: "login",

  created() {
    const token = localStorage.token;

    if (token) {
      // 解析token
      const data = jwt_decode(token);
      // console.log(data);

      // 存储到vuex
      this.$store.dispatch("setAuthenticated", !isEmpty(data));
      this.$store.dispatch("setUser", data);
    }
  }
};
</script>


<style>
body,
html,
#app {
  height: 100%;
  width: 100%;
}
</style>
