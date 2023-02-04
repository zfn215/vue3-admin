/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-03 15:30:25
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-03 15:40:11
 * @FilePath: /vue3-admin/src/config/piniaPersist.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PersistedStateOptions } from "pinia-plugin-persistedstate";
/**
 * @description: pinia持久化参数配置
 * @param {String} key 存储到持久化的配置
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 */
const piniaPersistConfig = (key: string, paths?: string[]) => {
	const persist: PersistedStateOptions = {
		key,
		storage: localStorage,
		paths
	};
	return persist;
};
export default piniaPersistConfig;
