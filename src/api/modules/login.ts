import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import { DynamicRouter } from "@/assets/json/dynamicRouter.json";
import AuthButtons from "@/assets/json/authButtons.json";
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
