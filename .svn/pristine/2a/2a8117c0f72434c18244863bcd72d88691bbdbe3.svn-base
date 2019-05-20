<script lang='tsx'>
import Component, { mixins } from "vue-class-component";
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import FormDrawerComponent from "@/components/common/FormDrawerComponent.vue";
import api from "@/api/interface.ts";
const rules = [{ required: true, message: "必填" }];

import mixin from "@/views/myBusiness/mixins.ts";
@Component({
  components: {
    QueryBar,
    TableComponent,
    FormDrawerComponent,
    PaginationComponent
  }
})
export default class SupplierView extends mixins(mixin) {
  created() {
    this.getTableData();
  }
  // 查询条件 input
  private searchFormList = {
    supplier: {
      type: "string",
      ui: {
        label: "供应商编码"
      }
    },
    supplierName: {
      type: "string",
      ui: {
        label: "供应商"
      }
    },
    status: {
      type: "checkbox",
      ui: {
        label: "状态"
      }
    }
  };
  public formData = {
    supplierCode: {
      type: "string",
      ui: {
        label: "商品编码",
        // readonly: true
        rules
      }
    },
    supplierName: {
      type: "string",
      ui: {
        label: "供应商名称",
        // readonly: true
        rules
      }
    },
    legalPerson: {
      type: "string",
      ui: {
        label: "法人代表",
        rules
      }
    },
    creditCode: {
      type: "string",
      ui: {
        label: "信用代码",
        rules
      }
    },
    contacts: {
      type: "string",
      ui: {
        label: "联系人",
        rules
      }
    },
    phone: {
      type: "string",
      ui: {
        label: "联系方式",
        rules
      }
    },
    currency: {
      // type: "select",
      type: 'string',
      ui: {
        label: "销售币别",
        rules
      }
    },
    carrier: {
      type: "checkbox",
      ui: {
        label: "是否承运商",
        default: {
          valuePropName: 'checked',
          initialValue: false
        }
      }
    },
    address: {
      type: "string",
      ui: {
        label: "公司地址",
        rules
      }
    }
  };
  public table = {
    list: [],
    count: 0,
    config: [
      {
        title: "供应商编码",
        dataIndex: "supplierCode",
        width: 200
      },
      {
        title: "供应商名称",
        dataIndex: "supplierName",
        width: 200
      },
      {
        title: "联系人",
        dataIndex: "contacts",
        width: 200
      },
      {
        title: "联系方式",
        dataIndex: "phone",
        width: 200
      },
      {
        title: "币别",
        dataIndex: "currency",
        width: 200
      },
      {
        title: "地址",
        dataIndex: "address",
        width: 300
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
          queryBarData={{ formList: this.searchFormList }}
          on-confirmTheDeletion={this.deleteTableData}
        />
        <table-component
          table={this.table}
          on-tableAllEvent={this.tableAllEvent}
        />
        <pagination-component
          total={this.table.count}
          on-pageChange={this.getTableData}
        />
        <form-drawer-component
          formData={this.formData}
          layout={50}
          drawerVisible={this.drawerVisible}
          on-closeDrawer={this.closeDrawer}
          on-formBlock={this.formBlock}
        />
      </div>
    );
  }
}
</script>