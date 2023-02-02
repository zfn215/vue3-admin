/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-01-30 15:39:06
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-01 16:50:52
 * @FilePath: /vue3-admin/src/vite-env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
