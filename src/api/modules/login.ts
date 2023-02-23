/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-10 19:59:10
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-22 14:32:15
 * @FilePath: /vue3-admin/src/api/modules/login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
// import { DynamicRouter } from "@/assets/json/dynamicRouter.json";
// import AuthButtons from "@/assets/json/authButtons.json";
// import qs from "qs";
import http from "@/api";
/**
 * @description: 登录模块
 * @return {*}
 */
export const loginApi = (params: Login.ReqLoginForm) => {
	// * 正常的post请求 application/json
	return http.post<Login.ResLogin>(PORT1 + "/login", params, { headers: { noLoading: true } });
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
	// return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
	// return http.get<Login.ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // 如果是 get 请求可以携带数组等复杂参数
};
// ** 获取按钮权限
export const getAuthButtonListApi = () => {
	return http.get<Login.ResAuthButtons>(PORT1 + "/auth/buttons", {}, { headers: { noLoading: true } });
};
// ** 获取菜单列表
export const getAuthMenuListApi = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + "/menu/list", {}, { headers: { noLoading: true } });
};
// ** 用户退出登录
export const logoutApi = () => {
	return http.post(PORT1 + "/logout");
};
