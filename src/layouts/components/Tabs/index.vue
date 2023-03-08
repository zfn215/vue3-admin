<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-03-02 14:38:52
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-08 10:22:37
 * @FilePath: /vue3-admin/src/layouts/components/Tabs/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
				<el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
					<template #label>
						<el-icon class="tabs-icon" v-show="item.icon && themeConfig.tabsIcon">
							<component :is="item.icon"></component>
						</el-icon>
						{{ item.title }}
					</template>
				</el-tab-pane>
			</el-tabs>
			<MoreButton />
		</div>
	</div>
</template>
<script setup lang="ts">
import Sortable from "sortablejs";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { AuthStore } from "@/stores/modules/auth";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import { TabsPaneContext } from "element-plus";
import MoreButton from "./components/MoreButton.vue";

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
const globalStore = GlobalStore();
const authStore = AuthStore();
const keepAliveStore = KeepAliveStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const themeConfig = computed(() => globalStore.themeConfig);

onMounted(() => {
	tabsDrop();
	initTabs();
});
// ** 拖拽排序
const tabsDrop = () => {
	Sortable.create(document.querySelector(".el-tabs__nav") as HTMLElement, {
		draggable: ".el-tabs__item",
		animation: 300,
		onEnd({ newIndex, oldIndex }) {
			const tabsList = [...tabStore.tabsMenuList];
			const currRow = tabsList.splice(oldIndex as number);
			// @ts-expect-error
			tabsList.splice(newIndex as number, 0, currRow);
			tabStore.setTabs(tabsList);
		}
	});
};
const initTabs = () => {
	authStore.flatMenuListGet.forEach(item => {
		if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
			const tabsParams = {
				icon: item.meta.icon,
				title: item.meta.title,
				path: item.path,
				name: item.name,
				close: !item.meta.isAffix
			};
			// @ts-expect-error
			tabStore.addTabs(tabsParams);
		}
	});
};
// ** 监听路由的变化 防止浏览器后退前进不变化
watch(
	() => route.fullPath,
	() => {
		if (route.meta.isFull) return;
		tabsMenuValue.value = route.fullPath;
		const tabsParams = {
			icon: route.meta.icon as string,
			title: route.meta.title as string,
			path: route.fullPath,
			name: route.name as string,
			close: !route.meta.isAffix
		};
		// @ts-expect-error
		tabStore.addTabs(tabsParams);
		route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
	},
	{
		immediate: true
	}
);
// tab Click
const tabClick = (tabItem: TabsPaneContext) => {
	const fullPath = tabItem.props.name as string;
	router.push(fullPath);
};
// ** 移除tab
const tabRemove = (fullPath: string) => {
	console.log(keepAliveStore);
	console.log(TabsStore, "tab");
	const name = tabStore.tabsMenuList.filter(item => item.path == fullPath)[0].name || "";
	keepAliveStore.removeKeepAliveName(name);
	console.log(fullPath);
	tabStore.removeTabs(fullPath, fullPath == route.fullPath);
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
