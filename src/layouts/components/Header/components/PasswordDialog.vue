<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-27 15:46:03
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-01 10:41:59
 * @FilePath: /vue3-admin/src/layouts/components/Header/components/PasswordDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
		<span>This is Password</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
const dialogVisible = ref(false);

// openDialog
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
