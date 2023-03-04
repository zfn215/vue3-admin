<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-27 15:42:25
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-04 13:56:14
 * @FilePath: /vue3-admin/src/layouts/components/Header/ToolBarLeft.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="tool-bar-lf">
		<CollapseIcon id="collapseIcon"></CollapseIcon>
		<Breadcrumb id="breadcrumb" v-if="themeConfig.breadcrumb" />
	</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { GlobalStore } from "@/stores";
import CollapseIcon from "./components/CollapseIcon.vue";
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>
<style scoped lang="scss">
.tool-bar-lf {
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	white-space: nowrap;
}
</style>
