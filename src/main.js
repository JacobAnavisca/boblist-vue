import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/fonts/stylesheet.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default-dark.css'
import VueGeolocation from 'vue-browser-geolocation'
import './assets/styles/_main.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt, faLinkedin, faDiscord, faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGithubAlt, faLinkedin, faDiscord, faTelegramPlane, faEnvelope)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueGeolocation)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
