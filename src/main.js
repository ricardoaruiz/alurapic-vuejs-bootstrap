import Vue from 'vue'
import VueResource from 'vue-resource';
import VeeValidate, { Validator } from 'vee-validate';
import msg_ptBR from 'vee-validate/dist/locale/pt_BR';
import App from './App.vue'
import router from './router'

/**
 * Os imports abaixo são todos para o bootstrap
 * Para instalar o bootstrap foram usados os seguintes comandos
 * npm install bootstrap
 * npm install jquery
 * npm install popper.js
 */
import 'jquery/dist/jquery.js'
import 'popper.js/dist/esm/popper.js'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css';
window.$ = require('jquery');

/**
 * Configurando o VueResource
 */
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';

/**
 * Configurando o VeeValidate
 */
Vue.use(VeeValidate);
Validator.localize('pt_BR', msg_ptBR);

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
