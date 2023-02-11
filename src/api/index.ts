/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-03 14:09:48
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-11 11:34:16
 * @FilePath: /vue3-admin/src/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { ResultData } from "@/api/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { checkStatus } from "./helper/checkStatus";
import { ElMessage } from "element-plus";
import { GlobalStore } from "@/stores";
import { LOGIN_URL } from "@/config/config";
import router from "@/routers";
const config = {
	// 默认请求的地址 env中文件更改
	baseUrl: import.meta.env.VITE_API_URL as string,
	timeout: 0,
	// 跨域时候允许携带凭证
	withCredentials: true
};
class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化 axios
		this.service = axios.create(config);
		/**
		 * @description: 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const globalStore = GlobalStore();
				// * 处理loading的显示和吟隐藏  { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = globalStore.token;
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				const globalStore = GlobalStore();
				// *请求结束之后关闭loading
				tryHideFullScreenLoading();
				// *登录失效 code 599
				if (data.code === ResultEnum.OVERDUE) {
					ElMessage.error(data.msg);
					globalStore.setToken("");
					router.replace(LOGIN_URL);
					return Promise.reject(data);
				}
				// 全局信息拦截 下载文件的时候返回数据流 没有code报错
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}
				// * 成功请求 （在页面上排除特殊情况 否则不用处理失败逻辑）
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				tryHideFullScreenLoading();
				// * 请求超时单独判断 请求超时没有response
				if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时");
				// * 根据响应的错误状态码 做不同处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回 断网
				if (!window.navigator.onLine) router.replace("/500");
				return Promise.reject(error);
			}
		);
	}
	// * 常用请求方法
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url:string,params?:object,_object={}):Promise<ResultData<T>>{
		return this.service.post(url,params,_object);
	}
	put<T>(url:string,params?:object,_object={}):Promise<ResultData<T>>{
		return this.service.post(url,params,_object);
	}
	delete<T>(url:string,params?:any,_object={}):Promise<ResultData<T>>{
		return this.service.delete(url,{params,..._object});
	}
	download<T>(url:string,params?:object,_object = {}){
		return this.service.post(url,params,{..._object,responseType:'blob'});
	}
}
export default new RequestHttp(config);
