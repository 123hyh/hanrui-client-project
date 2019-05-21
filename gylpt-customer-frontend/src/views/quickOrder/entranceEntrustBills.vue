<template>
  <section class="table-pad">
    <a-divider orientation="left">订单信息</a-divider>
    <!-- {/* 供应商 客户 */} -->
    <section class="order-message">
      <form-component
        :formData="FormData"
        @form="initForm"
        @clickSearch="formClickSearch"
        :layout="33.3"
      />
    </section>
    <a-divider style="position: relative" orientation="left">商品信息 币别：美元</a-divider>
    <btn-component class="localtion-btn" :btnList="btnList" @btnClick="commodityBtnClick"/>
    <!-- {/* 商品信息 */} -->
    <ediet-table :table="table" @setTableRowData="setTableRowData"></ediet-table>
    <!-- <section>
      <section class="table-layout">
        <table-component
          :table='table'
          @tableAllEvent='tableAllEvent'
        />
      </section>
    </section>-->
    <AccessoryUploader/>
    <BtnComponent @btnClick="btnClick" class="center-btn"/>
    <!-- <section class="layout">
          <section class="btn-width">
          </section>
    </section>-->
    <table-dialog-component
      @dialogVisible="tableDialogVisible"
      :isShowDialog="showDialog"
      :table="activeDialogTableConfig"
    ></table-dialog-component>
  </section>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from "vue-property-decorator";
// 组件
import TableComponent from "@/components/common/TableComponent.vue";
import AccessoryUploader from "@/components/common/AccessoryUploader.vue";
import BtnComponent from "@/components/common/BtnComponent.vue";
import FormComponent from "@/components/common/FormComponent.vue";
import EdietTable from "@/components/common/EdietTable/Table.vue";
import TableDialogComponent from "@/components/common/TableDialogComponent.vue";
import api from "@/api/interface.ts";

// mixins
import FormMinxi from "@/views/quickOrder/module/FormMinxi.ts";

// 配置数据
import data from "@/testData/tableData.ts";
import FormData from "@/testData/quickOrder/entranceEntrustBills.ts";
// 弹窗表格配置
import clientTableConfig from "@/configure/table/myBusiness/Client.ts";
import supplierTableConfig from "@/configure/table/myBusiness/Supplier.ts";
import utools from "@/utils/uTools";
const tableDataTemplate = {
  goodsName: "",
  model: "",
  unit: "",
  pieces: 0,
  price: 0,
  totalPrice: 0,
  netWeight: 0,
  grossWeight: 0,
  quantity: 0,
  sourceArea: "",
  brank: ""
  // key: Math.random()
};
@Component({
  components: {
    TableComponent,
    AccessoryUploader,
    BtnComponent,
    FormComponent,
    EdietTable,
    TableDialogComponent
  }
})
export default class entranceEntrustBills extends Mixins(FormMinxi) {
  // 显示弹窗
  public showDialog: boolean = false;
  // 弹窗选择后的code暂存；
  public requestCodeSet = {};
  // 表格上的按钮集合
  public btnList = [
    { label: "增加一行", key: "addOne" },
    { label: "批量增加", key: "addBatch" },
    { label: "新建商品", key: "create" },
    { label: "下载模板", key: "down" },
    { label: "批量上传", key: "upload" }
  ];
  // 表格编辑数据
  public table: any = {
    list: [
      /* {
        index: 1,
        goodsName: "空军一号",
        model: "a-133-a580",
        unit: "双",
        pieces: 1000,
        price: 1000,
        totalPrice: 1000 * 1000,
        netWeight: 200,
        grossWeight: 10,
        quantity: 1,
        sourceArea: "美国",
        brand: "耐克",
        key: Math.random()
      } */
    ],
    count: 0,
    config: [
      {
        title: "商品名称",
        dataIndex: "goodsName",
        width: 200
      },
      {
        title: "规格型号",
        dataIndex: "model",
        width: 200
      },
      {
        title: "单位",
        dataIndex: "unit",
        width: 200
      },
      {
        title: "数量",
        dataIndex: "quantity",
        width: 200
      },
      {
        title: "单价",
        dataIndex: "price",
        width: 300
      },
      {
        title: "总价",
        dataIndex: "totalPrice",
        width: 200
      },
      {
        title: "件数",
        dataIndex: "pieces",
        width: 200
      },
      {
        title: "净重(KG)",
        dataIndex: "netWeight",
        width: 200
      },
      {
        title: "毛重(KG)",
        dataIndex: "grossWeight",
        width: 200
      },
      {
        title: "原产地",
        dataIndex: "sourceArea",
        width: 200
      },
      {
        title: "品牌",
        dataIndex: "brand",
        width: 200
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 200
      }
    ].map(item => ({ ...item, scopedSlots: { customRender: item.dataIndex } })),
    loading: false
  };
  // 弹窗表格的配置
  public dialogTableConfig = {
    clientTableConfig,
    supplierTableConfig
  };
  // 当前高亮的弹窗配置
  public activeDialogTableConfig: any = {};
  // 当前target弹窗
  public searchTarget: string = "";

  // 当前 模块 的 类型  //  1进口 2出口 3转口 4 国内',
  public get bizType(): any {
    return {
      "/M0102": 1,
      "/M0103": 2,
      "/M0104": 3,
      "/M0105": 4
    };
  }
  // 页面初始化
  public created() {
    //  获取表单数据
    this.getData();
  }
  // 点击保存 或提交事件
  public btnClick(target: string) {
    target === "save" ? this.handleSave() : this.handleSubmit();
  }
  public tableAllEvent(data: object = {}) {
    debugger;
  }
  // 获取商品信息
  public async getQuickGoodsList() {
    try {
      const {
        data: { list, count },
        status
      } = await api.getQuickGoodsList({
        clientBillNo: this.responseFormData.clientBillNo
      });
      this.table.list = utools.setTableKey(list);
      this.table.count = count;
      console.log(1)
      return status;
    } catch (error) {
      console.log(error);
    }
  }
  // 修改商品信息的一行数据
  public async setTableRowData({ data, key }: { data: any; key: number }) {
    let code = this.responseFormData.clientBillNo;
    let index = this.table.list.findIndex((item: any) => item.key === key);
    try {
      if (code) {
        // 如果有 clientBillNo 表明主单据 已保存
        let method = data.itemCode ? "PUT" : "POST";
        const { data: res } = await api.changeQuickGoods({
          data: {
            ...data,
            clientBillNo: code
          },
          method
        });
        index !== -1 && (this.table.list[index] = { ...res, key });
      } else {
        this.table.list[index] = data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 隐藏和 显示 弹窗
  tableDialogVisible({
    isVisible,
    rowData = {}
  }: {
    isVisible: boolean;
    rowData?: any;
  }) {
    const { supplierName, supplierCode, customerName, customerCode } = rowData;
    let len = Object.keys(rowData).length;
    this.showDialog = isVisible;
    if (!len) return;
    let value: any = {
      supplierName: {
        supplierName,
        supplierCode
      },
      customerName: {
        customerName,
        customerCode
      }
    };
    let obj = value[this.searchTarget];
    this.requestCodeSet = { ...this.requestCodeSet, ...obj };
    this.form.setFieldsValue(obj);
  }

  // 表格 的按钮事件
  public commodityBtnClick(target: string) {
    var that: any = this;
    try {
      that[`${target}Data`]();
    } catch (error) {
      console.error("未配置按钮事件");
    }
  }
  // 添加商品一条数据
  public addOneData() {
    let { list } = this.table;
    list.unshift({ ...tableDataTemplate, key: Math.random() + Math.random() });
  }
}
</script>
<style lang="less" scoped>
.table-pad {
  box-sizing: border-box;
  padding: 10px;
  background: #fff;
}
.btnlist-width {
  justify-content: flex-end;
  margin-top: 0px;
  width: 100%;
}
.btn-operation {
  box-sizing: border-box;
  margin-bottom: 10px;
  width: 30%;
}
.layout {
  display: flex;
}
.btn-width {
  margin: auto;
  width: 300px;
}
.order-message {
  > div:not(:last-child) {
    border-right: 1px solid #e8e8e8;
  }
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  > div {
    flex-basis: 49.9%;
    > div {
      padding: 0 !important;
    }
  }
  > .form-layout {
    > .ant-form-item {
      background: red;
    }
  }
}
.localtion-btn {
  /* position: absolute;
  top: -2px;
  right: 0;
  z-index: 1; */
  margin-bottom: 10px;
}
.center-btn {
  text-align: center;
}
</style>