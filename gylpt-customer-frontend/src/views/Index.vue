<template>
  <a-card :class="$style.h">
    <a-card-grid :class="$style['index-card-top']">订单总数量</a-card-grid>
    <a-card-grid :class="$style['index-card-top']">订单总金额（万）</a-card-grid>
    <a-card-grid :class="$style['index-card-top']">
      <p :class="$style.setFontSize">汇率</p>
      <div :class="$style.exchangerate">
        <p v-for="(item,i) in exchangerate" :key='i'>{{item}}</p>
      </div>
    </a-card-grid>
    <a-card-grid :class="$style['index-card-center']">
      使用额度（万）：320
      授信额度（万）：500</a-card-grid>
    <a-card-grid :class="$style['index-card-center']">
      73
      已结算未付款金额（万）</a-card-grid>
  </a-card>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
@Component
export default class IndexView extends Vue {
  @Action("getExchangerateList") getExchangerateList: any;
  @Getter("exchangerateList") exchangerateList: any;
  get exchangerate() {
    return this.exchangerateList.reduce((pre: any, cur: any, i: number) => {
      return (pre = [
        ...pre,
        `1  ${cur.currency}  =  ${Math.round(+cur.cenPrice * 1000) /
          100000} 人民币`
      ]);
    }, []);
  }
  mounted() {
    this.getExchangerateList();
  }
}
</script>
<style lang="less" module>
.index-card-top {
  width: 33.33%;
  text-align: center;
  height: 50%;
}
.index-card-center {
  width: 50%;
  height: 50%;
  text-align: center;
}
.h {
  height: 100%;
  > div {
    height: 100%;
  }
}
.exchangerate{
  width: 100%;
  height: 90%;
  overflow: auto;
      text-align: left;
    padding-left: 180px;
}
.setFontSize{
  font-size: 18px;
}
</style>
