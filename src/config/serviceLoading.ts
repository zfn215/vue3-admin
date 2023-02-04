/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-03 11:22:45
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-03 14:00:27
 * @FilePath: /vue3-admin/src/config/serviceLoading.ts
 * @Description: * 全局的loading
 */
import { ElLoading } from "element-plus";

let loadingInstance: ReturnType<typeof ElLoading.service>;
const strictLoading = () => {
	loadingInstance = ElLoading.service({
		fullscreen: true,
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)"
	});
};
const endLoading = () => {
	loadingInstance.close();
};
// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要做的事就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		strictLoading();
	}
	needLoadingRequestCount++;
};
export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		endLoading();
	}
};
