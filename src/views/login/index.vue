<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-01 09:46:28
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-25 13:45:13
 * @FilePath: /vue3-admin/src/views/login/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="login-container flx-center">
		<!-- <SwitchDark class="dark" /> -->
		<div class="login-box">
			<div class="login-left">
				<img src="@/assets/images/login_left.png" alt="" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/logo.svg" />
					<h2 class="logo-text">vue3-admin</h2>
				</div>
				<LoginForm></LoginForm>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
// import SwitchDark from "@/components/SwitchDark/index.vue";
import LoginForm from "./components/LoginForm.vue";
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
