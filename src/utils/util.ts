/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-11 16:58:48
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-22 17:07:38
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
		// @ts-expect-error
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
		// @ts-expect-error
		item.children?.length && (item.children = getShowMenuList(item.children));
		// @ts-expect-error
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
		// @ts-expect-error
		if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
	}
	return result;
};
