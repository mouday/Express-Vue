import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.css'

import service from './uitls/request'
import moment from "moment";


const datetime = {
  formatDatetime(datetime) {
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss')
  }
}


Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'medium' });



// 获取用户角色, 可以从cookie中获取
function getRole() {
  return store.getters.user.identity;
}

// 校验用户权限，传入一个数组, 默认有权限
function hasPermission(roles) {
  const role = getRole();

  console.log(roles, role);

  if (Array.isArray(roles)) {
    console.log("array");
    return roles.includes(role)
  } else {
    return true
  }
}

/**
 * Vue自定义指令无法隐藏el-table-column ？
 * https://segmentfault.com/q/1010000020878180
 * 注册一个全局自定义指令 `v-role`
 */
Vue.directive('role', {
  inserted: (el, binding, vnode) => {
    console.log(el);

    // 如果没有权限就移除此节点
    if (!hasPermission(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
})


Vue.prototype.$axios = service;
Vue.prototype.$datetime = datetime;
Vue.prototype.$hasPermission = hasPermission;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
