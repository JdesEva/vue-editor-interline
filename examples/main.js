import Vue from 'vue'
import App from './App.vue'

import vueEditor from '../packages'

Vue.config.productionTip = false

Vue.use(vueEditor)

new Vue({
  render: h => h(App)
}).$mount('#app')
