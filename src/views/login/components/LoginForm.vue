<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-01 11:08:41
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-27 13:53:25
 * @FilePath: /vue3-admin/src/views/login/components/LoginForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名：admin / user">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="loginForm.password" placeholder="密码：123456" show-password autocomplete="new-password">
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">重置</el-button>
		<el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">
			登录
		</el-button>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/api/interface/index";
import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import type { ElForm } from "element-plus";
import { HOME_URL } from "@/config/config";
import { getTimeState } from "@/utils/util";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import md5 from "js-md5";
const router = useRouter();
const globalStore = GlobalStore();
const tabsStore = TabsStore();
const keepAlive = KeepAliveStore();

// 定义form校验规则
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});
const loading = ref(false);
const loginForm = reactive<Login.ReqLoginForm>({ username: "", password: "" });
// ** 登录
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			// 1.执行登录接口
			const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
			globalStore.setToken(data.access_token);

			// 2.添加动态路由
			await initDynamicRouter();

			// 3.清除上个账号的 tab 信息
			tabsStore.closeMultipleTab();
			keepAlive.setKeepAliveName();
			// 4.跳转到首页
			router.push(HOME_URL);
			ElNotification({
				title: getTimeState(),
				message: "欢迎登录 vue3-admin",
				type: "success",
				duration: 3000
			});
		} finally {
			loading.value = false;
		}
	});
};
// ** 重置for
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
onMounted(() => {
	// ** 监听enter事件 （调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>
<style scoped lang="scss">
@import "../index.scss";
</style>
