import { instance } from './config';
import mock from '@/mock/table/index.ts';
// tslint:disable-next-line:no-var-requires
const qs = require('qs');
// tslint:disable-next-line:no-var-requires
const md5 = require('md5');
// tslint:disable-next-line:class-name
interface page {
  pageIndex?: number;
  pageSize?: number;
  [propName: string]: any;
}
class Service {
  private request: any;
  constructor() {
    this.request = function ({ url, method, data }: { url: string, method: string, data?: object }) {
      return instance({
        url,
        method,
        [method !== 'GET' ? 'data' : 'params']: data,
      });
    };
  }
  // 查询字典信息
  public getDictData(item: string) {
    return this.request({
      url: `/dict/search/${item}`,
      method: 'GET',
    });
  }
  // 登录
  public goLogin({ userCode, password: p }: { userCode: string, password: string }) {
    const data = { userCode, password: md5(p) };
    return this.request({
      url: `/auth/login?${qs.stringify(data)}`,
      method: 'POST',
    });
  }
  // 退出登录
  public goLogout() {
    return this.request({
      url: `/auth/logout`,
      method: 'POST',
    });
  }
  // 重置密码
  // tslint:disable-next-line:max-line-length
  public resetPassword({ newPassword, oldPassword, userCode }: { newPassword: string; oldPassword: string, userCode: string }) {
    return this.request({
      url: `/auth/setpassword?${qs.stringify({
        oldPassword: md5(oldPassword),
        newPassword: md5(newPassword),
        userCode,
      })}`,
      method: 'POST',
    });
  }
  // 获取菜单
  public getMenuList() {
    return this.request({
      url: `/menu/search`,
      method: 'GET',
    });
  }
  // 获取汇率
  public getExchangerate() {
    return this.request({
      url: `/exchangerate/search`,
      method: 'GET',
    });
  }
  // 订单列表 表格 数据
  public getOrderList({ pageIndex = 1, pageSize = 10, ...params }: page = {}) {
    return this.request({
      url: `/quickentrust/search`,
      method: `POST`,
      data: {
        pageIndex,
        pageSize,
        ...params,
      },
    });
    // return mock.orderList(pageIndex, pageSize);
  }
  // 新增 修改 快捷下单
  public changeQuickEntrustData({ data = {}, method = 'POST' }: { data: any, method?: string }) {
    return this.request({
      url: `/quickentrust/`,
      method,
      data,
    });
  }
  // 提交 快捷下单
  public submitQuickEntrustData(data: any) {
    return this.request({
      url: `/quickentrust/submit`,
      method: 'POST',
      data,
    });
  }
  // 查询商品信息数据
  public getQuickGoodsList({ pageIndex = 1, pageSize = 10, ...obj }: { pageIndex?: number, pageSize?: number }) {
    return this.request({
      url: `/quickgoods/search`,
      method: 'POST',
      data: {
        pageIndex,
        pageSize,
        ...obj,
      },
    });
  }
  // 修改一条商品信息
  public changeQuickGoods({ data, method }: { data: any, method: string }) {
    return this.request({
      url: `/quickgoods/`,
      method,
      data,
    });
  }
  // 查询最近一条 已保存且未提交的 委托订单
  public getEntrustOrderData(bizType: number) {
    return this.request({
      url: `/quickentrust/${bizType}`,
      method: 'GET',
    });
  }
  // 授信申请
  public changeCreditRequest({ method = 'POST', data }: { method: string, data: any }) {
    return this.request({
      url: `/creditapply/`,
      method,
      data,
    });
  }
  // 提交授信申请
  public submitCreditapply({ data }: any) {
    return this.request({
      url: `/creditapply/submit`,
      method: 'POST',
      data,
    });
  }
  // 风控处理 表格 数据
  public getriskHandleData({ pageIndex = 1, pageSize = 10, ...params }: page = {}) {
    return this.request({
      url: `/creditapply/search`,
      method: 'POST',
      data: {
        pageSize,
        pageIndex,
        ...params,
      },
    });
    // return mock.riskHandle(pageIndex, pageSize);
  }
  // 商品信息 表格数据
  public getCommodityMsgData({ pageIndex = 1, pageSize = 10, ...params }: page = {}) {

    return this.request({
      url: `/goods/search`,
      method: 'POST',
      data: {
        pageIndex,
        pageSize,
        ...params.data,
      },
    });
    // return mock.commodityMsg(pageIndex, pageSize)
  }
  // 商品信息 表单增加数据
  public changeCommodityMsgData({ method = 'POST', data = {} }: { method: string, data: any }) {
    return this.request({
      url: `/goods/`,
      method,
      data,
    });
  }
  // 商品信息 删除单条数据
  public deleteCommodityMsg(code: string) {
    return this.request({
      url: `/goods/${code}`,
      method: 'DELETE',
    });
  }
  // 客户 分页数据查询
  public getClientPageData({ pageIndex = 1, pageSize = 10, ...param }: page = {}) {
    return this.request({
      url: `/customer/search`,
      method: 'POST',
      data: {
        pageIndex,
        pageSize,
        ...param.data,
      },
    });
    // return mock.client(pageIndex, pageSize);
  }
  // 客户 表单 数据操作
  public changeClientData({ method = 'POST', data = {} }: { method: string, data: any }) {
    return this.request({
      url: `/customer/`,
      method,
      data,
    });
  }
  // 客户 删除客户 一条数据
  public deleteClientData(code: string) {
    return this.request({
      url: `/customer/${code}`,
      method: 'DELETE',
    });
  }
  // 供应商 表格数据
  public getSupplierData({ pageIndex = 1, pageSize = 10, ...params }: page = {}) {
    return this.request({
      url: `/supplier/search`,
      method: 'POST',
      data: {
        pageIndex,
        pageSize,
        ...params.data,
      },
    });
    // return mock.supplier(pageIndex, pageSize);
  }
  // 供应商 增加 修改 数据
  public changeSupplierData({ method = 'POST', data = {} }: { method: string, data: any }) {
    return this.request({
      url: `/supplier/`,
      method,
      data,
    });
  }
  // 供应商 删除 数据
  public deleteSupplierData(code: string) {
    return this.request({
      url: `/supplier/${code}`,
      method: 'DELETE',
    });
  }

  // 我的信息 公司联络人
  public getCompanyContact({ pageIndex = 1, pageSize = 10, ...param }: page = {}) {
    return mock.companyContact(pageIndex, pageSize);
  }
}
/* class api {
  public install(Vue: any) {
    Vue.prototype.api = Object.freeze(new Service);
  }
}
export default api */
// tslint:disable-next-line:new-parens
const service: { [propName: string]: any } = new Service;
export default Object.freeze(service);
