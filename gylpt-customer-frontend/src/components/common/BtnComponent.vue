<script lang="tsx">
interface itemValue {
  label: string;
  key: string;
}
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
@Component
export default class ButtonComponent extends Vue {
  @Prop({
    default: () => [
      { label: "保存", key: "save" },
      { label: "提交", key: "submit" }
    ]
  })
  btnList: any;
  render() {
    return (
      <section class="btn-layout">
        {this.btnList.map((item: itemValue, i: number) => (
          <a-button
            type="primary"
            key={i}
            onClick={() => this.btnClick(item.key)}
          >
            {item.label}
          </a-button>
        ))}
      </section>
    );
  }
  // 点击按钮的事件
  @Emit("btnClick")
  public btnClick(target: string) {
    return target;
  }
}
</script>
<style lang="less" scoped>
/* .flex-layout {
  display: flex;
  justify-content: space-around;
  > button {
    margin-left: 10px;
  }
} */
.btn-layout{
  margin: 5px 0 ;
  > button{
    margin-left: 10px;
  }
}
</style>