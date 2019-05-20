<template>
<div class="tabs-style">
    <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit">
    <a-tab-pane v-for="pane in tabList" :tab="pane.title" :key="pane.key" :closable="pane.closable"></a-tab-pane>
  </a-tabs>
</div>

</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class TabsComponent extends Vue {
  public tabList: any[] = [
    { title: "Tab 1", content: "Content of Tab 1", key: "1" },
    { title: "Tab 2", content: "Content of Tab 2", key: "2" },
    { title: "Tab 3", content: "Content of Tab 3", key: "3" }
  ];
  public activeKey: string = this.tabList[0].key;
  public onEdit(key: string, method: string) {
    debugger;
  }
}
</script>
<style lang='less'>
.tabs-style{
  background: #fff;
  margin-top: 1px;
  box-sizing: border-box;
  >div{
    padding-left: 15px;
    >:first-child{
      margin: 0
    }
  }
}
</style>
