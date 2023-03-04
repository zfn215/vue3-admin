/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-01-30 15:39:06
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-04 14:05:55
 * @FilePath: /vue3-admin/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// element css
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark(自定义暗黑模式)
import "@/styles/theme/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers/index";
// vue i18n
import I18n from "@/languages/index";
// pinia store
import pinia from "@/stores/index";
// svg icons
import "virtual:svg-icons-register";
// errorHandler
import errorHandler from "@/utils/errorHandler";
const app = createApp(App);
app.config.errorHandler = errorHandler;
console.log(1);
// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(router).use(I18n).use(directives).use(ElementPlus).use(pinia).mount("#app");
