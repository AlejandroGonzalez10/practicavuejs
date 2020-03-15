// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuetify from 'vuetify'
import facebookLogin from 'facebook-login-vuejs';

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)

Vue.prototype.$http = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  axios,
  vuetify: new Vuetify(),
  facebookLogin,
  components: { App },
  template: '<App/>'
}).$mount('#app')
