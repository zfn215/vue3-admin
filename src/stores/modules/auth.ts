/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-11 15:41:35
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-22 14:12:09
 * @FilePath: /vue3-admin/src/stores/modules/auth.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getFlatArr } from "@/utils/util";
import { getAuthButtonListApi, getAuthMenuListApi } from "@/api/modules/login";
import { getShowMenuList, getAllBreadcrumbList } from "@/utils/util";
export const AuthStore = defineStore({
	id: "AuthState",
	state: (): AuthState => ({
		// 当前页面的 router name 用来做按钮权限筛选
		routeName: "",
		// 按钮权限列表
		authButtonList: {},
		// 菜单权限列表
		authMenuList: []
	}),
	getters: {
		// ** 按钮权限列表
		authButtonListGet: state => state.authButtonList,
		// ** 后端返回的菜单列表
		authMenuListGet: state => state.authMenuList,
		// ** 后端返回的菜单列表 左侧菜单渲染 需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.authMenuList),
		// ** 扁平化之后的一维数组路由 主要用来添加动态路由
		// @ts-expect-error
		flatMenuListGet: state => getFlatArr(state.authMenuList),
		// ** 所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
	},
	actions: {
		// 获取按钮列表
		async getAuthButtonList() {
			const { data } = await getAuthButtonListApi();
			this.authButtonList = data;
		},
		// 获取菜单列表
		async getAuthMenuList() {
			const { data } = await getAuthMenuListApi();
			this.authMenuList = data;
		},
		// 设置路由名称
		async setRouterName(name: string) {
			this.routeName = name;
		}
	}
});
