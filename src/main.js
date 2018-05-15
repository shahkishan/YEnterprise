// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'
import {store} from './store'
import firebase from 'firebase'
import Config from './Config/config'
var VueModels = require('vue-model')
    window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

  created(){
    var config = Config.config
    
    firebase.initializeApp(config)
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.$store.dispatch('autoSignIn',user)
      }
    })
  }
}) 