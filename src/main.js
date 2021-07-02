// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import '../src/components/button/demo.css'
import JKUI from 'jk-ui'
import 'jk-ui/theme-default/lib/index.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(JKUI)
Vue.use(ViewUI);
import VueGnComponents from "vue-gn-components";
import "vue-gn-components/lib/style/index.css";
Vue.use(VueGnComponents)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>'
})
