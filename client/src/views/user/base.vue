<script>
export default {
  name: "UserBase",

  data() {
    return {
      // 用户类型
      userTypes
    };
  },

  methods: {
    /**
     * 获取用户信息
     */
    async getUserInfo(uid) {
      return await this.$axios.get("/api/users/info/" + uid);
    },

    /**
     * 获取用户列表
     */
    async getUserList() {
      return await this.$axios.get("/api/users/list");
    },

    /**
     * 设置用户信息
     */
    async setUserInfo({ id, name, identity }) {
      const params = {
        id: id,
        name: name,
        identity: identity
      };
      return await this.$axios.post("/api/users/update", params);
    }
  }
};
</script>

