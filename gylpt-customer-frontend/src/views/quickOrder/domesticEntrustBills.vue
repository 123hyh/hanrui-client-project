<template>
  <section class="table-pad">
    <a-divider orientation="left">订单信息</a-divider>
    <!-- {/* 供应商 客户 */} -->
    <section class="order-message">
      <form-component
        :formData='FormData'
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
    <section>
      <section class="table-layout">
        <table-component
          :table='table'
          @tableAllEvent='tableAllEvent'
        />
      </section>
    </section>
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

import api from "@/api/interface.ts";

// 配置数据
import data from "@/testData/tableData.ts";
import FormData from "@/testData/quickOrder/entranceEntrustBills.ts";
@Component({
  components: {
    TableComponent,
    AccessoryUploader,
    BtnComponent,
    FormComponent
  }
})
export default class entranceEntrustBills extends Vue {
  public FormData = FormData;
  // public table = { ...data, height: 200 };
  public btnList = [
    { label: "增加商品", key: "add" },
    { label: "新建商品", key: "create" },
    { label: "下载模板", key: "down" },
    { label: "批量上传", key: "upload" }
  ];
  public table = {
    list: [
      {
        index: 1,
        commodityName: "空军一号",
        specifications: "a-133-a580",
        unit: "双",
        count: 1000,
        price: 1000,
        total: 1000 * 1000,
        pieceCount: 200,
        suttle: 10,
        roughWeight: 1,
        origin: '美国',
        brank: '耐克'
      }
    ],
    count: 0,
    config: [
      {
        title: "序号",
        dataIndex: "index",
        width: 200
      },
      {
        title: "商品名称",
        dataIndex: "commodityName",
        width: 200
      },
      {
        title: "规格型号",
        dataIndex: "specifications",
        width: 200
      },
      {
        title: "单位",
        dataIndex: "unit",
        width: 200
      },
      {
        title: "数量",
        dataIndex: "count",
        width: 200
      },
      {
        title: "单价",
        dataIndex: "price",
        width: 300
      },
      {
        title: "总价",
        dataIndex: "total",
        width: 200
      },
      {
        title: "件数",
        dataIndex: "pieceCount",
        width: 200
      },
      {
        title: "净重(KG)",
        dataIndex: "suttle ",
        width: 200
      },
      {
        title: "毛重(KG)",
        dataIndex: "roughWeight",
        width: 200
      },
      {
        title: "原产地",
        dataIndex: "origin",
        width: 200
      },
      {
        title: "品牌",
        dataIndex: "brank",
        width: 200
      }
    ],
    loading: false
  };
  public btnClick(target: string) {
    console.log(`当前点击按钮 --> ${target}`);
    this.$message.success("操作成功", 0.7);
  }
  public tableAllEvent(data: object = {}) {
    debugger;
  }
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