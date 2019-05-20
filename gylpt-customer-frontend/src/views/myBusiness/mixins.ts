
// tslint:disable-next-line:class-name
interface pageVal {
  page: {
    current: number;
    size: number;
  };
  row: any[];
  [propName: string]: any;
}
import Vue from 'vue';
import Component from 'vue-class-component';
import api from '@/api/interface.ts'
import utools from '@/utils/uTools.ts'
@Component
export default class MyMixin extends Vue {
  [x: string]: any;
  /**
   * @property drawerVisible 抽屉显示 的控制参数
   * @property btnTarget  当前 点击按钮类型
   * @property form form表单的对象
   * @property clickRow 点击当前表格的 行 数据
   */
  public drawerVisible: boolean = false;
  public btnTarget: string = '';
  public form: any = {};
  public clickRow: any = {};
  /**
   * @method queryBarBtnClick 当前点击按钮对象事件
   * @param target 当前点击按钮的key
   * @param form 当前查询栏的form
   */
  public queryBarBtnClick({ target, formData }: { target: string, formData: object }) {
    switch (target) {
      case "insert":
      case "update":
        this.drawerVisible = true;
        this.$nextTick(() => {
          this.form.resetFields();
          this.btnTarget !== 'insert' && this.form.setFieldsValue(this.clickRow);
        })
        break;
      case 'remove':
        if (!Object.keys(this.clickRow).length) {
          this.$message.error('请选择一条数据进行删除')
        }
        break;
      case 'query':
        this.getTableData({ data: formData })
        break;
    }
    this.btnTarget = target;
  };
  // 表格操作 事件 （分页 / 点击当前行数据）
  public tableAllEvent(data: pageVal) {
    const currentEvent = Object.keys(data)[0];
    // tslint:disable-next-line:no-unused-expression
    currentEvent && this.event[currentEvent](data[currentEvent]);
  }
  public handlePageChange({ current, size }: { current: number, size: number }): void {
    debugger
  }
  public handleTableClickRow(row: any): void {
    this.clickRow = row;
  }
  // 表单 点击 提交和取消的操作
  public closeDrawer(type: string) {
    if (type !== 'submit') {
      this.form.resetFields();
      this.drawerVisible = !this.drawerVisible;
    } else {
      this.form.validateFields((err: any, val: any) => {
        if (!err) val && this.operationFormData(val)
      })
    }
  };
  public get event(): any {
    return {
      page: this.handlePageChange,
      currentRowData: this.handleTableClickRow,
    };
  };
  // 表单操作 的 api接口配置
  /**
   * @property M0401 商品
   * @property M0403 客户
   */
  public get moduleChangeApi(): any {
    return {
      '/M0401': 'changeCommodityMsgData',
      '/M0402': 'changeSupplierData',
      '/M0403': 'changeClientData',
    }
  };
  // 删除的 api 接口配置
  public get moduleDeleteApi(): any {
    return {
      '/M0401': 'deleteCommodityMsg',
      '/M0402': 'deleteSupplierData',
      '/M0403': 'deleteClientData'
    }
  };
  // 表格分页数据接口
  public get tablePageApi(): any {
    return {
      '/M0401': 'getCommodityMsgData',
      '/M0402': 'getSupplierData',
      '/M0403': 'getClientPageData',
    }
  }
  // input框 的 实体 eventUp
  formBlock(form: any) {
    this.form = form;
    // this.btnTarget === 'insert' && this.form.setFieldsValue({});
  }
  // 表单 的 新增 修改操作
  async operationFormData(data: any) {
    let statusCode: number = 0;
    this.btnTarget === 'update' && (data.itemCode = this.clickRow.itemCode || 0)
    try {
      const { status } = await api[this.moduleChangeApi[this.$route.path]]({ data, method: this.btnTarget === 'insert' ? 'POST' : 'PUT' });
      statusCode = status;
      this.getTableData();
      this.drawerVisible = !this.drawerVisible;
    } catch (error) {
      console.log(error)
    };
    utools.setResponseMsg(statusCode, this)
  };
  // 删除 一条数据
  public async deleteTableData() {
    if (!Object.keys(this.clickRow).length) { this.$message.error('请选择一条数据进行删除'); return };
    // 模块配置 删除 的code 取值
    let deleteCode: any = {
      '/M0401': 'itemCode',
      '/M0402': 'supplierCode',
      '/M0403': 'customerCode'
    };
    // 状态码
    let statusCode = 0;
    try {
      const { status } = await api[this.moduleDeleteApi[this.$route.path]](this.clickRow[deleteCode[this.$route.path]]);
      statusCode = status;
      this.getTableData();
      this.clickRow = {};
    } catch (error) {
      console.log(error)
    }
    utools.setResponseMsg(statusCode, this)
  };
  public async getTableData(
    data: { pageIndex?: number; pageSize?: number, [propName: string]: any } = {}
  ) {
    this.table.loading = true;
    try {
      const {
        data: { list, count }
      } = await api[this.tablePageApi[this.$route.path]](data); // api.getClientPageData(data);
      utools.setTableKey(list, { state: { "0": "禁用", "1": "启用" } });
      this.table = { ...this.table, list, count };
    } catch (error) {
      console.log(error);
    } finally {
      this.table.loading = false;
    }
  }
}