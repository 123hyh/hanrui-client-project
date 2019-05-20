<script lang='tsx'>
import Component, { mixins } from "vue-class-component";
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import mixin from "@/views/myBusiness/mixins.ts";
import FormDrawerComponent from "@/components/common/FormDrawerComponent.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import commodityMsgFormData from "@/testData/form/commodityMsg.ts";

import api from "@/api/interface.ts";
const rules = [{ required: true, message: "必填" }];
@Component({
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent,
    FormDrawerComponent
  }
})
export default class CommodityMsg extends mixins(mixin) {
  created() {
    this.getTableData();
  }
  private searchFormList = {
    goodsCode: {
      type: "string",
      ui: {
        label: "商品编码"
      }
    },
    goodsName: {
      type: "string",
      ui: {
        label: "商品名称"
      }
    },
    model: {
      type: "string",
      ui: {
        label: "规格"
      }
    }
  };
  public formData = {
    goodsCode: {
      type: "string",
      ui: {
        label: "商品编码"
        // readonly: true,
      }
    },
    goodsName: {
      type: "string",
      ui: {
        label: "商品名称",
        rules
      }
    },
    model: {
      type: "string",
      ui: {
        label: "规格",
        rules
      }
    },
    unit: {
      type: "select",
      ui: {
        label: "单位"
        // rules
      }
    },
    brand: {
      type: "string",
      ui: {
        label: "品牌",
        rules
      }
    },
    sourceArea: {
      type: "string",
      ui: {
        label: "原产地",
        rules
      }
    },
  };
  public table = {
    list: [],
    count: 0,
    config: [
      {
        title: "商品编码",
        dataIndex: "goodsCode",
        width: 200
      },
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
        title: "创建时间",
        dataIndex: "createTime",
        width: 200
      },
      {
        title: "状态",
        dataIndex: "state",
        width: 200
      }
    ],
    loading: false
  };
  render() {
    return (
      <div>
        <query-bar
          on-queryBarBtnClick={this.queryBarBtnClick}
          on-confirmTheDeletion={this.deleteTableData}
          queryBarData={{ formList: this.searchFormList }}
        />
        <table-component
          on-tableAllEvent={this.tableAllEvent}
          table={this.table}
        />
        <pagination-component
          total={this.table.count}
          on-pageChange={this.getTableData}
        />
        <form-drawer-component
          formData={this.formData}
          on-formBlock={this.formBlock}
          drawerVisible={this.drawerVisible}
          on-closeDrawer={this.closeDrawer}
        />
      </div>
    );
  }
}
</script>