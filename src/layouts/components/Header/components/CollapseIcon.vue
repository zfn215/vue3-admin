<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-27 15:44:45
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-01 14:13:24
 * @FilePath: /vue3-admin/src/layouts/components/Header/components/CollapseIcon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-icon class="collapse-icon" @click="collapse">
		<component :is="themeConfig.isCollapse ? 'expand' : 'fold'"></component>
	</el-icon>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const collapse = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: !themeConfig.value.isCollapse });
};
</script>
<style scoped lang="scss">
.collapse-icon {
	margin-right: 20px;
	font-size: 22px;
	cursor: pointer;
}
</style>
