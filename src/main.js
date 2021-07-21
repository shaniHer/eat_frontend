import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/main'
import './styles/main.scss'

import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui'
// Vue.use(ElementUI);
Vue.use(ElementUI, { locale })

// import vuetify from '@/plugins/vuetify.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faInstagram} from '@fortawesome/free-brands-svg-icons'

library.add(faUserSecret,faFacebookSquare,faTwitter,faLinkedin,faInstagram)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  // vuetify,
  render: h => h(app)
}).$mount('#app')


