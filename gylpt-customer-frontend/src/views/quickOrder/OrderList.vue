<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import TableComponent from "@/components/common/TableComponent.vue";
import FormComponent from "@/components/common/FormComponent.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";

import api from "@/api/interface.ts";
import tableConfig from "@/configure/table/orderList.ts";

@Component({
  components: {
    TableComponent,
    FormComponent,
    PaginationComponent
  }
})
export default class OrderList extends Vue {
  created() {
    this.getTableData();
  }
  render() {
    return (
      <section>
        <a-tabs
          on-change={(key: string) => {
            this.tabClick(key);
          }}
        >
          {this.tabList.map((item, i) => {
            return (
              <a-tab-pane tab={item.label} key={item.key}>
                <table-component
                  table={this.table}
                  on-tableAllEvent={this.tableAllEvent}
                />
              </a-tab-pane>
            );
          })}
        </a-tabs>
        <pagination-component
          total={this.table.count}
          on-pageChange={this.getTableData}
        />
      </section>
    );
  }
  public table = {
    loading: false,
    list: [],
    count: 0,
    config: tableConfig
  };
  private tabList = [
    { label: "所有订单", key: "allOrder", content: "1" },
    { label: "未结算订单", key: "noCloseOrder", content: "2" },
    { label: "已结算订单", key: "yetCloseOrder", content: "3" },
    { label: "订单评价", key: "orderEvaluate", content: "4" }
  ];
  /**
   * @method getTableData 获取表格数据 条数
   */
  public async getTableData(
    data: { pageIndex?: number; pageSize?: number } = {}
  ) {
    this.table.loading = true;
    const { list, count } = await api.getOrderList(data);
    setTimeout(() => {
      this.table = { ...this.table, list, count, loading: false };
    }, 500);
  }
  public tableAllEvent(data: object = {}) {
    debugger;
  }

  public tabClick(key: string) {
    this.table.count = 0;
    this.getTableData();
  }
}
</script>