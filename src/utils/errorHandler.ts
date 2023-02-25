/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-10 19:59:10
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-23 17:28:03
 * @FilePath: /vue3-admin/src/utils/errorHandler.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ElNotification } from "element-plus";

/**
 * @description 全局代码错误捕捉
 * */
const errorHandler = (error: any) => {
	// 过滤 HTTP 请求错误
	if (error.status || error.status == 0) return false;
	let errorMap: { [key: string]: string } = {
		InternalError: "Javascript引擎内部错误",
		ReferenceError: "未找到对象",
		TypeError: "使用了错误的类型或对象",
		RangeError: "使用内置对象时，参数超范围",
		SyntaxError: "语法错误",
		EvalError: "错误的使用了Eval",
		URIError: "URI错误"
	};
	let errorName = errorMap[error.name] || "未知错误";
	ElNotification({
		title: errorName,
		message: error,
		type: "error",
		duration: 3000
	});
};

export default errorHandler;
