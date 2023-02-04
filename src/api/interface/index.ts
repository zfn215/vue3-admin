/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-03 10:31:18
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-03 14:35:22
 * @FilePath: /vue3-admin/src/api/interface/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}
// 请求响应参数
export interface ResultData<T = any> extends Result {
	data: T;
}
// * 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		[key: string]: string[];
	}
}
