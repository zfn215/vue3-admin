<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-27 15:46:43
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-01 16:24:33
 * @FilePath: /vue3-admin/src/layouts/components/Header/components/ThemeSetting.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEtem
-->
<template>
	<div class="theme-setting">
		<i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openDrawer"></i>
	</div>
</template>
<script setup lang="ts">
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
	mittBus.emit("openThemeDrawer");
};
</script>
