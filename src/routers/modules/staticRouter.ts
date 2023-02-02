/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-01 14:21:46
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-02 17:28:27
 * @FilePath: /vue3-admin/src/routers/modules/staticRouter.ts
 * @Description: 静态路由
 */
import { RouteRecordRaw } from "vue-router";
import { LOGIN_URL, HOME_URL } from "@/config/config";
/**
 * @description: 静态路由
 * @return {*}
 */
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: HOME_URL
	},
	{
		path: LOGIN_URL,
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录"
		}
	}
];
