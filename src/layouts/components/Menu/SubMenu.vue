<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-03-02 11:42:45
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-04 16:19:41
 * @FilePath: /vue3-admin/src/layouts/components/Menu/SubMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				<el-icon>
					<component :is="subItem.meta.icon"></component>
				</el-icon>
				<span>{{ subItem.meta.title }}</span>
			</template>
			<SubMenu :menuList="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
			<el-icon>
				<component :is="subItem.meta.icon"></component>
			</el-icon>
			<template #title>
				<span>{{ subItem.meta.icon }}</span>
			</template>
		</el-menu-item>
	</template>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps<{ menuList: Menu.MenuOptions }>();
const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '"_blank"');
	router.push(subItem.path);
};
</script>
