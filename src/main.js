import Vue from 'vue';
import App from './App.vue';
import router from "./router/index";
import store from "./store";
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//定义一个事件总线
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//使用attach函数
FastClick.attach(document.body)

//安装vue-lazyload
Vue.use(VueLazyload, {
  // loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
