/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-01 11:21:55
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-01 11:42:26
 * @FilePath: /vue3-admin/src/routers/index.ts
 * @Description: 系统路由
 */
import { createRouter, createWebHashHistory } from "vue-router";
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

const router = createRouter({
	history: createWebHashHistory(),
	routes: [],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});
export default router;
