// 接口拦截器
/* interface responseVal {
  data: object;
  status: number;
  [propName: string]: any;
} */
import axios from "axios";
import handlestatusCode from "@/api/statusCode.ts"
const isProd = process.env.NODE_ENV === "production";
const instance = axios.create({
  baseURL: isProd ? /* "http://47.107.253.252:8083/customer" */ "/apis" : "/service",
});
// 设置请求头
instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use((config: any) => {
  return config;
});
instance.interceptors.response.use((response: any) => {
  return Promise.resolve(response);
}, (error: any) => {
  return Promise.reject({ ...handlestatusCode(error.response.status), error });
});
export { instance };
