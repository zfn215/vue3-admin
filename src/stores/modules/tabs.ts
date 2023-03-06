/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-23 14:30:29
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-06 16:42:57
 * @FilePath: /vue3-admin/src/stores/modules/tabs.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/stores/interface";
import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/routers/index";
export const TabsStore = defineStore({
	id: "TabsState",
	state: (): TabsState => ({
		tabsMenuList: []
	}),
	actions: {
		// ** 添加tab
		async addTabs(tabItem: TabsMenuProps) {
			if (this.tabsMenuList.every((item: { path: any }) => item.path !== tabItem.path)) {
				this.tabsMenuList.push(tabItem);
			}
		},
		// ** 移除tab
		async removeTabs(tabPath: string, isCurrent: boolean = true) {
			const tabsMenuList = this.tabsMenuList;
			if (isCurrent) {
				console.log("移除");
				tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return;
					const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
					if (!nextTab) return;
					router.push(nextTab.path);
				});
			}
			this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
		},
		// ** 关闭多选tab
		async closeMultipleTab(tabsMenuValue?: string) {
			this.tabsMenuList = this.tabsMenuList.filter(item => {
				return item.path === tabsMenuValue || !item.close;
			});
		},
		// ** 设置tab
		async setTabs(tabsMenuList: TabsMenuProps[]) {
			this.tabsMenuList = tabsMenuList;
		},
		// ** 设置tab名称
		async setTabsTitle(title: string) {
			const nowFullPath = location.hash.substring(1);
			this.tabsMenuList.forEach(item => {
				if (item.path === nowFullPath) item.title = title;
			});
		},
		persist: piniaPersistConfig("TabsState")
	}
});
