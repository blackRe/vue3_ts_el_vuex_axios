import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index1.ts'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//json格式化
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';

// import Promise from "promise-polyfill";

// if(!window.Promise){
//     window.Promise = Promise;
// }

import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)
import './assets/css/common.css';


Vue.use(ElementUI);



// Vue.use(ViewUI);
//拦截器设置
import axios from './utils/request.ts'
Vue.prototype.$axios=axios



//请求路由管理
import ajaxUrl from './ajaxUrl/index.ts'
Vue.prototype.$ajaxUrl=ajaxUrl
// // 跨域处理
// Vue.prototype.apiProxy='/apiProxy'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
