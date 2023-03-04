<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-27 14:26:49
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-04 15:20:41
 * @FilePath: /vue3-admin/src/layouts/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<component :is="LayoutComponents[themeConfig.layout]" />
	<ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from "vue";
import { GlobalStore } from "@/stores";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
// import LayoutVertical from "./LayoutVertical/index.vue";
import LayoutClassic from "./LayoutClassic/index.vue";
// import LayoutTransverse from "./LayoutTransverse/index.vue";
// import LayoutColumns from "./LayoutColumns/index.vue";

const LayoutComponents: { [key: string]: Component } = {
	// vertical: LayoutVertical,
	classic: LayoutClassic
	// transverse: LayoutTransverse,
	// columns: LayoutColumns
};
console.log("layout");

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
console.log(themeConfig.value);
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
