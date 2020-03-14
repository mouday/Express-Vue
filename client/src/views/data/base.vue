<script>
export default {
  name: "DataBase",

  props: [],

  components: {},

  data() {
    return {};
  },

  computed: {},

  methods: {
    async getArticleList({ page = 1, size = 5 }) {
      const params = { page, size };
      return await this.$axios.get("/api/articles/list", { params });
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
</style>