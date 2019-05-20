<script lang='tsx'>
// import { Vue, Component } from "vue-property-decorator";
import Component, { mixins } from "vue-class-component";
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import FormDrawerComponent from "@/components/common/FormDrawerComponent.vue";
import api from "@/api/interface.ts";
import mixin from "@/views/myBusiness/mixins.ts";
const rules = [{ required: true, message: "必填" }];
@Component({
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent,
    FormDrawerComponent
  }
})
export default class clientView extends mixins(mixin) {
  created() {
    this.getTableData();
  }
  public formData = {
    customerCode: {
      type: "string",
      ui: {
        label: "客户编码",
        // readonly: true
        rules
      }
    },
    customerName: {
      type: "string",
      ui: {
        label: "客户名称",
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
      // type: "select", 暂时改 输入
      type: 'string',
      ui: {
        label: "采购币别"
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
  private searchFormList = {
    customerCode: {
      type: "string",
      ui: {
        label: "客户编码"
      }
    },
    customerName: {
      type: "string",
      ui: {
        label: "客户"
      }
    },
    state: {
      type: "checkbox",
      ui: {
        label: "状态"
      }
    }
  };
  public table = {
    list: [],
    count: 0,
    config: [
      {
        title: "客户编码",
        dataIndex: "customerCode",
        width: 200
      },
      {
        title: "客户名称",
        dataIndex: "customerName",
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
          drawerVisible={this.drawerVisible}
          on-closeDrawer={this.closeDrawer}
          on-formBlock={this.formBlock}
        />
      </div>
    );
  }
}
</script>