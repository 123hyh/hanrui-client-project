<template>
  <section class="table-pad">
    <a-divider orientation="left">订单信息</a-divider>
    <!-- {/* 供应商 客户 */} -->
    <section class="order-message">
      <form-component
        :formData='FormData'
        @form='initForm'
        :layout='33.3'
      />
    </section>
    <a-divider
      style="position: relative"
      orientation="left"
    >
      商品信息 币别：美元
    </a-divider>
    <btn-component
      class="localtion-btn"
      :btnList='btnList'
      @btnClick='btnClick'
    />
    <!-- {/* 商品信息 */} -->
    <ediet-table
      :table='table'
      @setTableRowData='setTableRowData'
    ></ediet-table>
    <!-- <section>
      <section class="table-layout">
        <table-component
          :table='table'
          @tableAllEvent='tableAllEvent'
        />
      </section>
    </section> -->
    <AccessoryUploader />
    <BtnComponent
      @btnClick='btnClick'
      class="center-btn"
    />
    <!-- <section class="layout">
          <section class="btn-width">
          </section>
        </section> -->
  </section>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
// 组件
import TableComponent from "@/components/common/TableComponent.vue";
import AccessoryUploader from "@/components/common/AccessoryUploader.vue";
import BtnComponent from "@/components/common/BtnComponent.vue";
import FormComponent from "@/components/common/FormComponent.vue";
import EdietTable from "@/components/common/EdietTable/Table.vue";
import api from "@/api/interface.ts";

// 配置数据
import data from "@/testData/tableData.ts";
import FormData from "@/testData/quickOrder/entranceEntrustBills.ts";
@Component({
  components: {
    TableComponent,
    AccessoryUploader,
    BtnComponent,
    FormComponent,
    EdietTable
  }
})
export default class entranceEntrustBills extends Vue {
  // 表格配置
  public FormData = {
    supplier: {
      type: "btnSearch",
      ui: {
        label: "供应商"
      }
    },
    client: {
      type: "btnSearch",
      ui: {
        label: "客户"
      }
    },
    sellCurrency: {
      type: "select",
      ui: {
        label: "销售币别",
        dict: "currencyName",
        options: [
          { itemKey: "1", itemVal: "美金" },
          { itemKey: "2", itemVal: "港币" },
          { itemKey: "3", itemVal: "日元" }
        ]
      }
    },
    deliveryWay: {
      type: "select",
      ui: {
        label: "交货方式",
        dict: "cargoMode",
        options: [
          { itemKey: "1", itemVal: "美金" },
          { itemKey: "2", itemVal: "港币" },
          { itemKey: "3", itemVal: "日元" }
        ]
      }
    },
    procurementCurrency: {
      type: "select",
      ui: {
        dict: "currencyName",
        label: "采购币别",
        options: [
          { itemKey: "1", itemVal: "美金" },
          { itemKey: "2", itemVal: "港币" },
          { itemKey: "3", itemVal: "日元" }
        ]
      }
    },
    ReceivingGoodsWay: {
      type: "select",
      ui: {
        label: "收货方式",
        dict: "cargoMode",
        options: [
          { itemKey: "1", itemVal: "美金" },
          { itemKey: "2", itemVal: "港币" },
          { itemKey: "3", itemVal: "日元" }
        ]
      }
    }
  };
  public form: any = {};
  // public table = { ...data, height: 200 };
  public btnList = [
    { label: "增加一行", key: "addOne" },
    { label: "批量增加", key: "add" },
    { label: "新建商品", key: "create" },
    { label: "下载模板", key: "down" },
    { label: "批量上传", key: "upload" }
  ];
  public table: any = {
    list: [
      {
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
        brank: "耐克",
        key: Math.random()
      }
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
        dataIndex: "brank",
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
  public initForm(form: any) {
    this.form = form;
  }
  // 点击保存 或提交事件
  public btnClick(target: string) {
    target === "save" ? this.handleSave() : this.handleSubmit();
  }
  // 保存
  public handleSave() {
    this.form.validateFields(async (err: any, value: any) => {
      try {
        if (!err) {
          const data = await api.changeQuickEntrustData({});
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
  // 提交
  public handleSubmit() {}
  public tableAllEvent(data: object = {}) {
    debugger;
  }
  // 获取表格数据
  public async getTableData(
    data: { pageIndex?: number; pageSize?: number } = {}
  ) {
    this.table.loading = true;
    try {
      const { list, count } = await api.getClientData(data);
      this.table = { ...this.table, list, count };
    } catch (error) {
      console.log(error);
    } finally {
      this.table.loading = false;
    }
  }
  // 修改商品信息的一行数据
  public setTableRowData({ data, key }: { data: any; key: number }) {
    this.table.list[
      this.table.list.findIndex((item: any) => item.key === key)
    ] = data;
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