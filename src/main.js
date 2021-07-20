import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/main'
import './styles/main.scss'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

import vuetify from '@/plugins/vuetify.js'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(app)
}).$mount('#app')


