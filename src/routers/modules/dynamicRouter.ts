/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-11 15:21:52
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-04 15:33:20
 * @FilePath: /vue3-admin/src/routers/modules/dynamicRouter.ts
 * @Description:动态添加路由
 */
import router from "@/routers/index";
import { isType } from "@/utils/util";
import { ElNotification } from "element-plus";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import { LOGIN_URL } from "@/config/config";
import { notFoundRouter } from "@/routers/modules/staticRouter";
// 引入iviews 文件夹下所有vue文件
const modules = import.meta.glob("@/views/**/*.vue");
/**
 * @description: 初始化动态路由
 * @return {*}
 */
export const initDynamicRouter = async () => {
	const authStore = AuthStore();
	const globalStore = GlobalStore();
	console.log("动态添加路由");
	try {
		// ** 获取菜单列表和按钮列表 可合并
		await authStore.getAuthMenuList();
		await authStore.getAuthButtonList();
		// * 判断当前用户有么有菜单权限
		if (!authStore.authMenuListGet.length) {
			ElNotification({
				title: "无权限访问",
				message: "当前账号无任何菜单权限，请联系系统管理员",
				type: "warning",
				duration: 3000
			});
			globalStore.setToken("");
			router.replace(LOGIN_URL);
			return Promise.reject("No permission");
		}
		// **添加动态路由
		authStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children;
			if (item.component && isType(item.component) == "string") {
				item.component = modules["/src/views" + item.component + ".vue"];
			}
			if (item.meta.isFull) {
				router.addRoute(item);
			} else {
				router.addRoute("layout", item);
			}
			// ** 最后添加 notFoundRouter
			router.addRoute(notFoundRouter);
		});
	} catch (error) {
		globalStore.setToken("");
		router.replace(LOGIN_URL);
		return Promise.reject(error);
	}
};
