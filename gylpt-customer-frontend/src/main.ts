import Vue from "vue";
import App from "./App.vue";
import router from "./router/config";
import store from "./store/store";
import Ant from "ant-design-vue";
import directive from "@/directive/index.ts";
import "@/styles/normalize.css";
import "ant-design-vue/dist/antd.css";
// 定义接口
/* import api from "@/api/interface.ts"
Vue.use(new api); */
Vue.use(directive);
Vue.config.productionTip = false;
Vue.use(Ant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
console.log(Vue)
