<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-03-01 16:49:27
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-02 11:22:02
 * @FilePath: /vue3-admin/src/layouts/components/Main/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<maximize v-if="themeConfig.maximize"></maximize>
	<Tabs />
	<el-main>
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="keepAliveStore.keepAliveName">
					<component :is="Component" :key="route.path" v-if="isRouterShow" />
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
	<el-footer v-if="themeConfig.footer">
		<Footer />
	</el-footer>
</template>
<script setup lang="ts">
import { ref, computed, onBeforeUnmount, provide, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { GlobalStore } from "@/stores";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import Maximize from "./components/Maximize.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";
const globalStore = GlobalStore();
const keepAliveStore = KeepAliveStore();
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
// ** 刷新当前页面
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);
// ** 监听当前页是否最大化 动态添加class
watch(
	() => themeConfig.value.maximize,
	() => {
		const app = document.getElementById("app") as HTMLElement;
		if (themeConfig.value.maximize) app.classList.add("main-maximize");
		else app.classList.remove("main-maximize");
	},
	{
		immediate: true
	}
);
// ** 监听窗口大小 折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
	screenWidth.value = document.body.clientWidth;
	if (!isCollapse.value && screenWidth.value < 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: true });
	if (isCollapse.value && screenWidth.value > 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: false });
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
	window.removeEventListener("resize", listeningWindow);
});
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
