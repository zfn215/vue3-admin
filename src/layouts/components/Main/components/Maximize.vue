<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-03-01 17:01:20
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-06 15:20:42
 * @FilePath: /vue3-admin/src/layouts/components/Main/components/Maximize.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="maximize" @click="exitMaximize">
		<!-- 最大化 -->
		<el-icon><Close /></el-icon>
	</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const exitMaximize = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, maximize: false });
};
</script>
<style scoped lang="scss">
.maximize {
	position: fixed;
	top: -25px;
	right: -25px;
	z-index: 999;
	width: 52px;
	height: 52px;
	cursor: pointer;
	background-color: var(--el-color-info);
	border-radius: 50%;
	opacity: 0.7;
	&:hover {
		background-color: var(--el-color-info-dark-2);
	}
	.el-icon {
		position: relative;
		top: 68%;
		left: 32%;
		font-size: 16px;
		color: #ffffff;
		transform: translate(-50%, -50%);
	}
}
</style>
