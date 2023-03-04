<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-27 15:44:15
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-28 19:56:21
 * @FilePath: /vue3-admin/src/layouts/components/Header/components/Avatar.vue
 * @Description:
-->
<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img src="@/assets/images/avatar.gif" alt="avatar" />
		</div>

		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="() => openDialog('infoRef')">
					<el-icon><User /></el-icon>{{ $t("header.personalData") }}
				</el-dropdown-item>
				<el-dropdown-item @click="() => openDialog('passwordRef')">
					<el-icon><Edit /></el-icon>{{ $t("header.changePassword") }}
				</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>
					<el-icon><SwitchButton /></el-icon>{{ $t("header.logout") }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<!-- infoDialog -->
	<InfoDialog ref="infoRef"></InfoDialog>
	<!-- passwordDialog -->
	<PasswordDialog ref="passwordRef"></PasswordDialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { GlobalStore } from "@/stores";
import { LOGIN_URL } from "@/config/config";
import { logoutApi } from "@/api/modules/login";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
const router = useRouter();
const globalStore = GlobalStore();
// ** 退出登录
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(async () => {
		// ** 调用退出接口
		await logoutApi();
		// ** 清楚token
		globalStore.setToken("");
		// ** 重定向到登录页
		router.replace(LOGIN_URL);
		ElMessage.success("退出登录成功");
	});
};
interface DialogExpose {
	openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
// 打开修改密码和个人信息弹窗
const openDialog = (refName: string) => {
	if (refName == "infoRef") infoRef.value?.openDialog();
	else passwordRef.value?.openDialog();
};
</script>
<style scoped lang="scss">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
