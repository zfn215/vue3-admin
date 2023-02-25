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
