/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-11 16:58:48
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-11 17:32:42
 * @FilePath: /vue3-admin/src/utils/util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置:
 */
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
