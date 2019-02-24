import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueJsonp from 'vue-jsonp'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor);
Vue.use(VueJsonp);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
    data(){
      return {
        JumpIndex: null
      }
    },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
