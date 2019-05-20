<script lang='tsx'>
import { Vue, Component } from "vue-property-decorator";
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/TableComponent.vue";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import api from "@/api/interface.ts";
import utools from "@/utils/uTools.ts";
@Component({
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent
  }
})
export default class creditRequest extends Vue {
  created() {
    this.getTableData();
  }
  render() {
    return (
      <div>
        <query-bar
          queryBarData={{}}
          btnList={this.btnList}
          on-queryBarBtnClick={this.queryBarBtnClick}
        />
        <table-component
          table={this.table}
          on-tableAllEvent={this.tableAllEvent}
        />
        <pagination-component
          total={this.table.count}
          on-pageChange={this.getTableData}
        />
      </div>
    );
  }
  public btnList = {
    update: "修改"
  };
  public table = {
    list: [],
    count: 0,
    config: [
      {
        title: "申请单号",
        dataIndex: "applyNo",
        width: 200
      },
      {
        title: "申请时间",
        dataIndex: "applyTime",
        width: 200
      },
      {
        title: "申请额度(万)",
        dataIndex: "applyAmount",
        width: 200
      },
      {
        title: "币别",
        dataIndex: "currency",
        width: 200
      },
      {
        title: "授信期限",
        dataIndex: "creditDeadline",
        width: 200
      },
      {
        title: "处理进度",
        dataIndex: "state",
        width: 200
      },
      {
        title: "备注",
        dataIndex: "remark",
        width: 500
      }
    ],
    loading: false
  };
  public clickRow: any = {};
  public async getTableData(
    data: { pageIndex?: number; pageSize?: number } = {}
  ) {
    this.table.loading = true;
    try {
      const {
        data: { list, count }
      } = await api.getriskHandleData(data);
      this.table = { ...this.table, list: utools.setTableKey(list), count };
    } catch (error) {
      console.log(error);
    } finally {
      this.table.loading = false;
    }
  }
  public queryBarBtnClick({ target }: { target: string }) {
    let pathObj: any = {
      name: "creditRequest",
      params: { clickRow: { ...this.clickRow } }
    };
    pathObj.params.clickRow.DurationOfApplication = [
      utools.dateFromEntries(this.clickRow.creditBegin),
      utools.dateFromEntries(this.clickRow.creditEnd)
    ];
    Object.keys(this.clickRow).length &&
      target === "update" &&
      this.$router.push(pathObj);
  }
  public tableAllEvent({ currentRowData }: { [propName: string]: any }) {
    !currentRowData.state && (this.clickRow = currentRowData);
  }
}
</script>
