import Vue from 'vue'
import App from './App.vue'
import {router} from "@/routes/index"
import store from './store'
import * as UI from './element-ui'
import "./assets/css/reset.css"
import 'element-ui/lib/theme-chalk/index.css';
for(let item of Object.values(UI)) {
  Vue.component(item.name,item)
}
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
