import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import './registerServiceWorker'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(Vuelidate)
Vue.use(Uimini)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAQ-KbhDbCueYxUVQz7fnVmVwojfQ8MJcU",
      authDomain: "task-manager-a868c.firebaseapp.com",
      databaseURL: "https://task-manager-a868c.firebaseio.com",
      projectId: "task-manager-a868c",
      storageBucket: "task-manager-a868c.appspot.com",
      messagingSenderId: "884239803529"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadTasks')
      this.$store.dispatch('loadComments')
      this.$store.dispatch('loadMarkers')
    })
  },
  render: h => h(App)
}).$mount('#app')