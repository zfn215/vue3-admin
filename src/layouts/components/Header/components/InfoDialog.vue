<!--
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-27 15:45:14
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-01 10:11:24
 * @FilePath: /vue3-admin/src/layouts/components/Header/components/InfoDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-dialog v-model="dialogVisible" title="个人信息" width="500px" dialogVisible>
		<span>个人信息</span>
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
// 打开
const openDialog = () => {
	dialogVisible.value = true;
};
defineExpose({ openDialog });
</script>
