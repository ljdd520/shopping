import Vue from 'vue'
import App from './App'
import router from './router'
// 导入element-ui组件
// 引入Vuex的store对象
import store from './store'
import ElementUI from 'element-ui'
// 导入相应的样式
import 'element-ui/lib/theme-chalk/index.css'

// 使用组件
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
