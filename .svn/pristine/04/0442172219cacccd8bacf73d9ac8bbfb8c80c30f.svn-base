import router from "@/router/config.ts";
export default (code: number) => {
  let param: { status?: number, explain: string } = { explain: "" };
  switch (code) {
    case 403:
    param = { status: 403, explain: "无权限拒绝访问,请登录"};
    router.push("/");
  }
  return param;
};
