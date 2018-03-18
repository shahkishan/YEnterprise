// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'
import {store} from './store'
var VueModels = require('vue-model')
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios
Vue.use(Vuetify)
Vue.use(Vuex)
// Vue.use(VueModel);

// Vue.models.register('user',{
//   attributes: [
//     'id',
//     'name',
//     'email',
//     'contact'
// ],

// http:{
//     baseRoute: 'url',
//     actions:{
//         destroy:false
//     }
// },
// methods:{
//     login(){
//         alert('login()');
//     }
// }
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})