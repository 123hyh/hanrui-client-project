import { Vue, Component } from 'vue-property-decorator';
import api from '@/api/interface.ts';
import utools from '@/utils/uTools';
@Component
export default class Save extends Vue {
  [x: string]: any;
  public responseFormData: any = {};
  // form 实例对象
  public form: any = {};
  // 表单配置
  public FormData = {
    supplierName: {
      type: 'btnSearch',
      ui: {
        label: '供应商',
      },
    },
    customerName: {
      type: 'btnSearch',
      ui: {
        label: '客户',
      },
    },
    saleCurrency: {
      type: 'select',
      ui: {
        label: '销售币别',
        dict: 'currencyName',
        options: [
          /*  { itemKey: "1", itemVal: "美金" },
           { itemKey: "2", itemVal: "港币" },
           { itemKey: "3", itemVal: "日元" } */
        ],
      },
    },
    deliveryMethod: {
      type: 'select',
      ui: {
        label: '交货方式',
        dict: 'cargoMode',
        options: [
          /* { itemKey: "1", itemVal: "美金" },
          { itemKey: "2", itemVal: "港币" },
          { itemKey: "3", itemVal: "日元" } */
        ],
      },
    },
    purchaseCurrency: {
      type: 'select',
      ui: {
        dict: 'currencyName',
        label: '采购币别',
        options: [
          /* { itemKey: "1", itemVal: "美金" },
          { itemKey: "2", itemVal: "港币" },
          { itemKey: "3", itemVal: "日元" } */
        ],
      },
    },
    receiveMethod: {
      type: 'select',
      ui: {
        label: '收货方式',
        dict: 'cargoMode',
        options: [
          /*  { itemKey: "1", itemVal: "美金" },
           { itemKey: "2", itemVal: "港币" },
           { itemKey: "3", itemVal: "日元" } */
        ],
      },
    },
  };
  // 初始化 form 实例
  public initForm(form: any) {
    this.form = form;
  }
  // 获取委托订单
  public async getData() {
    try {
      const { data = {}, status } = await api.getEntrustOrderData(
        this.bizType[this.$route.path],
      );
      this.responseFormData = data;
      this.form.setFieldsValue(data);
      // tslint:disable-next-line:no-unused-expression
      data.clientBillNo && await this.getQuickGoodsList();
      console.log(1)
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
    }
  }
  // 保存操作
  public handleSave() {
    this.form.validateFields(async (err: any, value: any) => {
      try {
        if (!err) {
          // 处理请求参数
          const set = {
            ...this.responseFormData,
            ...value,
            ...this.requestCodeSet,
            bizType: this.bizType[this.$route.path],
            quickGoods: this.table.list,
          };
          const { data, status } = await api.changeQuickEntrustData({
            data: set,
          });
          // tslint:disable-next-line:no-unused-expression
          status === 200 && this.$message.success('保存成功!!!');
          await this.getData();
        }
      } catch (error) {
        this.$message.error('保存失败, 请重试!!!');
        // tslint:disable-next-line:no-console
        console.log(error);
      }
    });
  };
  // 提交操作
  public async handleSubmit() {
    /* 
      存在BUG
    
    */
    try {
      if (!Object.keys(this.responseFormData).length) {
        this.$message.warning('请先保存');
        return;
      } else {
        await this.handleSave();
        console.log(2) // 2311
        const { data, status } = await api.submitQuickEntrustData(this.responseFormData);
        console.log(3)
        // tslint:disable-next-line:no-unused-expression
        status === 200 && this.$message.success('提交成功!!!');
        this.getData();
      }
    } catch (error) {
      this.$message.error('提交失败,请重试!!!');
      // tslint:disable-next-line:no-console
      console.log(error);
    }
  }
  // 点击搜索按钮 设置表格配置 ，请求对应的表格数据
  public formClickSearch(key: string) {
    this.searchTarget = key;
    switch (key) {
      case 'supplierName':
        this.activeDialogTableConfig = {
          ...this.dialogTableConfig.supplierTableConfig,
        };
        this.getSupplierTableData();
        break;
      case 'customerName':
        this.activeDialogTableConfig = {
          ...this.dialogTableConfig.clientTableConfig,
        };
        this.getclientTableData();
        break;
    }
    this.activeDialogTableConfig.loading = true;
    this.showDialog = true;
  }
  // 获取供应商弹窗列表
  public async getSupplierTableData() {
    try {
      const {
        data: { list, count }
      } = await api.getSupplierData();
      this.activeDialogTableConfig.list = utools.setTableKey(list);
      this.activeDialogTableConfig.count = count;
      this.activeDialogTableConfig.loading = false;
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
    }
  }
  // 获取客户弹窗列表
  public async getclientTableData() {
    try {
      const {
        data: { list, count }
      } = await api.getClientPageData();
      this.activeDialogTableConfig.list = utools.setTableKey(list);
      this.activeDialogTableConfig.count = count;
      this.activeDialogTableConfig.loading = false;
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
    }
  }
}