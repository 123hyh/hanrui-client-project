<template>
  <a-pagination
    showSizeChanger
    @showSizeChange="pageChange"
    @change='pageChange'
    :total="total"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class PaginationComponent extends Vue {
  @Prop({ default: 0, type: Number }) total!: number;
  public pageChange(current: number, size: number) {
    if(this.total > size){
      this.$emit("pageChange", { pageIndex: current, pageSize: size });
    }
  }
}
</script>
