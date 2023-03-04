/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-02 18:00:47
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-04 16:35:14
 * @FilePath: /vue3-admin/src/stores/index.ts
 * @Description: 初始化pinia
 */
import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProps } from "./interface";
import { DEFAULT_PRIMARY } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
export const GlobalStore = defineStore({
	// id 在所有store中唯一
	id: "GlobalState",
	state: (): GlobalState => ({
		// token
		token: "",
		// userInfo
		userInfo: "",
		// element组件大小
		assemblySize: "default",
		// language
		language: "",
		// themeConfig
		themeConfig: {
			// 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
			layout: "classic",
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false,
			// 折叠菜单
			isCollapse: false,
			// 面包屑导航
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: true,
			// 标签页图标
			tabsIcon: true,
			// 页脚
			footer: true,
			// 当前页面是否全屏
			maximize: false
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token;
		},
		// setUserInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo;
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: string) {
			this.assemblySize = assemblySize;
		},
		// updateLanguage
		updateLanguage(language: string) {
			this.language = language;
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProps) {
			console.log(themeConfig);
			this.themeConfig = themeConfig;
		}
	},
	persist: piniaPersistConfig("GlobalState")
});
// piniaPersist(持久化)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
