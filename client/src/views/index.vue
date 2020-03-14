<template>
  <div class>
    <div class="history">
      <span style="margin-right:20px;">历史上的今天:</span>

      <!-- 数据来源： http://www.todayonhistory.com/code/ -->
      <iframe
        src="http://www.todayonhistory.com/code/4.html?w=500&h=25&bky=dotted&bks=1&bkc=#D0D0D0&fs=16&fc=#015bf1&hg=25&ie=0&xhx=none&sd=3000&px=2&len=0&sk=1&n=0"
        width="500"
        height="25"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "",

  props: [],

  components: {},

  data() {
    return {};
  },

  computed: {},

  methods: {},

  created() {}
};
</script>

<style  scoped>
.history {
  display: flex;
  align-items: center;
}
</style>