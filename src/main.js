import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuelidate from "vuelidate"
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.config.productionTip = false
Vue.use(Vuelidate);

new Vue({
  router,
  vuetify,
  store,
  VueLodash,
  lodash,
  render: h => h(App)
}).$mount('#app')

