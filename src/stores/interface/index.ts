/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-10 19:59:10
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-11 16:35:59
 * @FilePath: /vue3-admin/src/stores/interface/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: string;
	language: string;
	themeConfig: ThemeConfigProps;
}
/* themeConfigProp */
export interface ThemeConfigProps {
	layout: string;
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isCollapse: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	footer: boolean;
	maximize: boolean;
}
/**
 * @description: 用户菜单状态
 * @return {*}
 */
export interface AuthState {
	routeName: string;
	authButtonList: {
		[key: string]: string[];
	};
	authMenuList: Menu.MenuOptions[];
}
