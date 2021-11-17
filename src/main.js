import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import NotifyErrorPlugin from './plugins/notifyErrorPlugin';

import 'normalize.css';
import './assets/css/global.css';

Vue.config.productionTip = false;

Vue.use(NotifyErrorPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
