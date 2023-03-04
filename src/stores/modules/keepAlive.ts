/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-23 14:31:02
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-03-03 17:04:07
 * @FilePath: /vue3-admin/src/stores/modules/keepAlive.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { keepAliveState } from "@/stores/interface";
export const KeepAliveStore = defineStore({
	id: "KeepAliveStore",
	state: (): keepAliveState => ({
		keepAliveName: []
	}),
	actions: {
		// ** 添加路由名称
		async addKeepAliveName(name: string) {
			!this.keepAliveName.includes(name) && this.keepAliveName.push(name);
		},
		async removeKeepAliveName(name: string) {
			this.keepAliveName = this.keepAliveName.filter(item => item !== name);
		},
		async setKeepAliveName(keepAliveName: string[] = []) {
			this.keepAliveName = keepAliveName;
		}
	}
});
