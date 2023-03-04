/*
 * @Author: zhangfuning 401645191@qq.com
 * @Date: 2023-02-28 11:31:52
 * @LastEditors: zhangfuning 401645191@qq.com
 * @LastEditTime: 2023-02-28 15:33:42
 * @FilePath: /vue3-admin/src/utils/theme/tool.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ElMessage } from "element-plus";
/**
 * @description:加深颜色值
 * @param color 颜色值 字符串
 * @param level 加深的程度 限 0-1之间
 * @return {*} 返回处理后的颜色值
 */
export function hexToRgb(str: any) {
	let hexs: any = "";
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(str)) return ElMessage.warning("输入错误的hex");
	str = str.replace("#", "");
	hexs = str.match(/../g);
	for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
	return hexs;
}

export function getDarkColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
/**
 * rgb颜色转Hex颜色
 * @param r 代表红色
 * @param g 代表绿色
 * @param b 代表蓝色
 * @returns 返回处理后的颜色值
 */
export function rgbToHex(r: any, g: any, b: any) {
	let reg = /^\d{1,3}$/;
	if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return ElMessage.warning("输入错误的rgb颜色值");
	let hexs = [r.toString(16), g.toString(16), b.toString(16)];
	for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
	return `#${hexs.join("")}`;
}
/**
 * @description:变浅颜色值
 * @param color 颜色值 字符串
 * @param level 加深的程度 限 0-1之间
 * @return {*} 返回处理后的颜色值
 */
export function getLightColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
