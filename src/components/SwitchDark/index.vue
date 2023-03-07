<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-03-06 17:42:12
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-06 17:43:42
 * @FilePath: /vue3-admin/src/components/SwitchDark/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-switch v-model="themeConfig.isDark" @change="onAddDarkChange" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" />
</template>

<script setup lang="ts" name="SwitchDark">
import { computed } from "vue";
import { GlobalStore } from "@/stores";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useTheme } from "@/hooks/useTheme";
const globalStore = GlobalStore();

const { switchDark } = useTheme();

const themeConfig = computed(() => globalStore.themeConfig);

const onAddDarkChange = () => {
	switchDark();
};
</script>
