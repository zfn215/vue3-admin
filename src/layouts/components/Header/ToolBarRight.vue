<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-27 15:42:42
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-04 13:58:34
 * @FilePath: /vue3-admin/src/layouts/components/Header/ToolBarRight.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<AssemblySize id="assemblySize" />
			<Language id="language" />
			<SearchMenu id="searchMenu" />
			<ThemeSetting id="themeSetting" />
			<Message id="message" />
			<Fullscreen id="fullscreen" />
		</div>
		<span class="username">Geeker</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import SearchMenu from "./components/SearchMenu.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Message from "./components/Message.vue";
import Language from "./components/Language.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import AssemblySize from "./components/AssemblySize.vue";
import Avatar from "./components/Avatar.vue";
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px 0 0;
	.header-icon {
		display: flex;
		align-items: center;
		& > * {
			margin-left: 21px;
		}
	}
	.username {
		margin: 0 20px;
		font-size: 15px;
	}
}
</style>
