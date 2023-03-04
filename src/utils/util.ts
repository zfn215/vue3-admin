/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-11 16:58:48
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-01 16:25:07
 * @FilePath: /vue3-admin/src/utils/util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置:
 */
/**
 * @description: 判断数据类型
 * @parma {any} val 需要判断类型的数据
 * @return {*}
 */
export function isType(val: any) {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toLocaleString.call(val).slice(8, -1).toLocaleLowerCase();
}
/**
 * @description: 扁平化路由对象 处理路由菜单
 * @param: menuList 菜单列表
 * @return {*}
 */
export function getFlatArr(menuList: Menu.MenuOptions) {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
	return newMenuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
		let flatArr = [...pre, current];
		if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
		return flatArr;
	}, []);
}
/**
 * @description: 使用递归 过滤出需要渲染在左侧菜单的列表
 * @param {Array} menuList 所有菜单列表
 * @return {*}
 */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
	return newMenuList.filter(item => {
		item.children?.length && (item.children = getShowMenuList(item.children));

		return !item.meta?.isHide;
	});
}
/**
 * @description: 递归找出所有面包屑 存到pina中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {Array} parent 父级菜单
 * @return {*}
 */
export const getAllBreadcrumbList = (menuList: Menu.MenuOptions[], result: { [key: string]: any } = {}, parent = []) => {
	for (const item of menuList) {
		result[item.path] = [...parent, item];
		if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
	}
	return result;
};
/**
 * @description: 获取对应时间的提示语
 * @return {*}
 */
export function getTimeState() {
	// 获取当前时间
	let timeNow = new Date();
	// 获取当前小时
	let hours = timeNow.getHours();
	// 判断当前时间段
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
	if (hours >= 10 && hours <= 14) return `中午好 🌞`;
	if (hours >= 14 && hours <= 18) return `下午好 🌞`;
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}
/**
 * @description: 获取浏览器默认语言
 * @return {*}
 */
export function getBrowserLang() {
	// @ts-expect-error
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
}
