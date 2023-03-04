/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-02 18:00:32
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-01 10:29:11
 * @FilePath: /vue3-admin/src/languages/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createI18n } from "vue-i18n";
import zh from "./modules/zh";
import en from "./modules/en";
const i18n = createI18n({
	legacy: false, // 如果要支持 compositionAPI，此项必须设置为 false
	locale: "zh", // 设置语言类型
	globalInjection: true, // 全局注册$t方法
	messages: {
		zh,
		en
	}
});
export default i18n;
