<script lang='tsx'>
/* 菜单组件 */
import { Vue, Component, Prop } from "vue-property-decorator";
import menuList from "@/testData/menu/index.ts";
import { Getter } from "vuex-class";
@Component
export default class MenuItem extends Vue {
  // public menuList = menuList;
  @Getter("menuList") "menuList": any[];
  public render() {
    return (
      <div class="menu">
        <div class="log">
          <h3>客户系统</h3>
        </div>
        <a-menu
          on-openChange={this.onOpenChange}
          on-click={(item: any) => this.menuClick(item)}
          mode="inline"
          theme="dark"
          class="menu-overflow"
        >
          {this.menuList.map((item, index) => {
            return item.subs.length ? (
              <a-sub-menu key={`sub${index}`}>
                <span slot="title">
                 {/*  <a-icon type={"icon iconfont icon-ziyuan"} /> */}
                 <span class={`icon iconfont ${item.menuCode}`}></span>
                  <span>{item.menuName}</span>
                </span>
                {item.subs.map((elem: any, i: number) => {
                  return (
                    <a-menu-item key={elem.menuCode}>
                      {elem.menuName}
                    </a-menu-item>
                  );
                })}
              </a-sub-menu>
            ) : (
              <a-menu-item key={item.menuCode}>
                <a-icon type="home" style="margin-right: 25px;font-size: 20px"/>
                <span >{item.menuName}</span>
              </a-menu-item>
            );
          })}
        </a-menu>
      </div>
    );
  }
  collapsed: boolean = false;
  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  public menuClick({ key }: { key: string }) {
    this.$router.push({ path: key });
  }
  public onOpenChange(openKeys: string[]) {
    openKeys.length > 1 && openKeys.shift();
  }
}
</script>
<style lang="less" scoped>
.menu {
  width: 250px;
  .log {
    height: 5vmin;
    background-color: #001529;
    line-height: 5vmin;
    h3 {
      color: rgba(255, 255, 255, 0.65) !important;
      text-align: center;
    }
  }
  > ul {
    height: 95vmin;
  }
  .menu-overflow {
    overflow: auto;
  }
}
</style>
