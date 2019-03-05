import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue' // Here
import 'bootstrap/dist/css/bootstrap.css' // Here
import 'bootstrap-vue/dist/bootstrap-vue.css' // Here
import App from './App.vue'

Vue.use(BootstrapVue) // Here

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')