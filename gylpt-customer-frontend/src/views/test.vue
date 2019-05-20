<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import TableComponent from "@/components/common/TableComponent.vue";
import FormComponent from '@/components/common/FormComponent.vue'
@Component({
  components: {
    TableComponent,
    FormComponent
  }
})
export default class IndexComponent extends Vue {
  public formData:object = {
    form: this
  }
  render() {
    return (
      <div>
        <TableComponent
          on-paginationChange={(page: { current: number; size: number }) =>
            this.paginationChange(page)
          }
          on-handleClickTableClickRow={(param: object) =>
            this.handleTableRowClick(param)
          }
        />
        <form-component formData={this.formData}></ form-component>
      </div>
    );
  }
  // 点击当前行数据
  handleTableRowClick(rowData: object) {
    debugger;
  }
  // 当前页码|pageSize数据
  paginationChange(pageData: { current: number; size: number }) {
    debugger;
  }
}
</script>
