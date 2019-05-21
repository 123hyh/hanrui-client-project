<script lang='tsx'>
import { Vue, Component, Prop } from "vue-property-decorator";
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import data from "@/testData/tableData.ts";

// 接口类型
interface currentAndSize {
  current: number;
  size: number;
}
@Component
export default class TableComponent extends Vue {
  get tableWidth() {
    return this.table.config.reduce((pre: number, cur: { width: number }) => {
      return (pre += cur["width"] || 0);
    }, 0);
  }
  @Prop({
    type: Object,
    default: () => ({})
  })
  table: any;
  render() {
    let {
      handleClickTableClickRow,
      pageChange,
      table: {
        // pagination: { total = 0, isShow = false } = {},
        count = 0,
        height = "",
        list: data,
        config,
        loading = false
      }
    } = this;
    return (
      <section
        class="table-width-auto"
        onClick={(e: Event) => handleClickTableClickRow(e)}
      >
        <a-table
          loading={loading}
          bordered
          pagination={false}
          columns={config}
          dataSource={data}
          scroll={{ x: this.tableWidth }}
        />
        {/*  <a-table
          bordered
          columns={config}
          dataSource={data}
          pagination={false}
          scroll={{ y: height, x: 500 }}
        ></a-table>
        <a-pagination
          showSizeChanger
          on-change={(current: number, size: number) =>
            pageChange({ current, size })
          }
          on-showSizeChange={(current: number, size: number) =>
            pageChange({ current, size })
          }
          defaultCurrent={6}
          total={total}
          class="pagination-back-gauge"
        /> */}
      </section>
    );
  }
  // 点击当前行取得当前行数据的key 取table.data对于的一条数据
  handleClickTableClickRow(e: any) {
    e.stopPropagation();
    // 如果当前点击对象不是 td 就不处理
    if (e.target.nodeName !== "TD") return;
    // 点击当前行
    let rowIndex = +e.target.parentNode.getAttribute("data-row-key");
    // 点击当前行 背景颜色 高亮
    for (let elem of e.target.parentNode.parentNode.childNodes) {
      let index = +elem.getAttribute("data-row-key");
      index === rowIndex
        ? elem.classList.add("table-active-row")
        : [...elem.classList].includes("table-active-row") &&
          elem.classList.remove("table-active-row");
    }
    this.$emit("tableAllEvent", {
      currentRowData: this.table.list.filter(
        (item: any) => item.key === rowIndex
      )[0]
    });
  }

  // 当前 (页码 | pageSize) 变化
  pageChange({ current = 1, size = 10 }: currentAndSize) {
    this.$emit("tableAllEvent", { page: { current, size } });
  }
}
</script>
<style lang="less">
.table-active-row {
  background-color: #e6f7ff !important;
}
.pagination-back-gauge {
  margin: 20px 0 0 0;
  text-align: right;
}
.table-width-auto {
  box-sizing: border-box;
  overflow: auto;
}
</style>