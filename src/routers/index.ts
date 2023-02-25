/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-01 11:21:55
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-24 17:09:33
 * @FilePath: /vue3-admin/src/routers/index.ts
 * @Description: 系统路由
 */
import { GlobalStore } from "@/stores";
import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter } from "./modules/staticRouter";
import NProgress from "@/config/nprogress";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config/config";
import { AuthStore } from "@/stores/modules/auth";
console.log(staticRouter);
/**
 * @description: 动态路由参数配置简介
 * @param path ===> 菜单路径
 * @param name 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 */
console.log(1);
const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});
console.log(router);
/**
 * @description: 路由拦截
 * @return {*}
 */
router.beforeEach(async (to, from, next) => {
	const globalStore = GlobalStore();
	// ** 路由开始跳转
	NProgress.start();
	// ** 动态设置标题
	const title = import.meta.env.VITE_GLOB_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title}-${title}` : title;
	// ** 没有token重置路由
	if (to.path === LOGIN_URL) {
		if (globalStore.token) return next(from.fullPath);
		resetRouter();
		return next();
	}
	// ** 3判断是否在白名单中 存在直接放行
	if (ROUTER_WHITE_LIST.includes(to.path)) return next();
	// ** 判断是否有token 没有重定向到login
	if (!globalStore.token) return next({ path: LOGIN_URL, replace: true });
});
/**
 * @description: 重置路由
 * @return {*}
 */
export const resetRouter = () => {
	const authStore = AuthStore();
	authStore.flatMenuListGet.forEach(route => {
		const { name } = route;
		console.log(name);
		if (name && router.hasRoute(name)) router.removeRoute(name);
	});
};
/**
 * @description: 路由跳转结束
 * @return {*}
 */
router.afterEach(() => {
	NProgress.done();
});
/**
 * @description: 路由跳转错误
 * @return {*}
 */
router.onError(error => {
	NProgress.done();
	console.warn("路由错误", error.message);
});
export default router;
