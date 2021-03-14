import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/styles/index.scss' // global css
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import moment from 'moment'
import VueVideoPlayer from 'vue-video-player';
// import 'videojs-contrib-hls/dist/videojs-contrib-hls.min'; 
import 'video.js/dist/video-js.css'
import './components/index'

Vue.config.productionTip = false
Vue.prototype.$moment = moment;
Vue.use(ElementUI)
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
