import moment from 'moment';

// tslint:disable-next-line:class-name
interface formValue {
  [propName: string]: any;
}
class UTools {
  /* 剔除对象 undefined || null */
  public mapObj(obj: formValue) {
    let param = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        param = { ...param, [key]: obj[key] };
      }
    };
    return param;
  };
  public setTableKey(data: any, params: any) {
    // 参数例子
    // utools.setTableKey(list, { state: { "0": "禁用", "1": "启用" } });
    return data.map((item: any) => {
      item.key = Math.random() + Math.random();
      // tslint:disable-next-line:forin
      for (const key in params) {
        item[key] = params[key][`${+item[key]}`]
      };
      return item;
    })
  };
  // 表单操作是否成功
  public setResponseMsg(code: number, Vue: any) {
    if (/^2/.test('' + code)) {
      Vue.$message.success('操作成功');
    } else {
      Vue.$message.error('操作出现错误');
    }
  };
  // 格式化时间
  public formatDate(date: any) {
    return date.format('YYYY-MM-DD HH:mm:ss');
  }
  // 字符串转moment时间对象
  public dateFromEntries(date: string) {
    return moment(new Date(date));
  }
  // 设置checkbox高亮
  /* public setFormCheckboxActive({ formConfig, data }: any) {
    for (let key in formConfig) {
      if (formConfig[key]['type'] === 'checkbox') {
        let target = (document.getElementById(key) || document).parentElement;
        if (data[key]) {
          target && (target.className += ' ant-checkbox-checked')
        } else {
          target && target.classList.remove('ant-checkbox-checked')
        }
      }
    }
  } */
}
// tslint:disable-next-line:new-parens
const utools: { [propName: string]: any } = new UTools;
export default Object.freeze(utools);
