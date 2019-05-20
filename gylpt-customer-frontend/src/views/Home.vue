<template>
  <section class="home">
    <!-- 菜单 -->
    <menu-item></menu-item>
    <section class="main">
      <!-- 头部 -->
      <header-item></header-item>
      <!-- tab -->
      <!-- <tabs-component></tabs-component> -->
      <!-- view -->
      <section class="main-view">
        <!-- <transition name='fade'> -->
        <router-view/>
        <!-- </transition> -->
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HeaderItem from "@/components/Home/HeaderItem.vue";
import MenuItem from "@/components/Home/MenuItem.vue";
import TabsComponent from "@/components/Home/TabsComponent.vue";
import api from "@/api/interface.ts";
import { Action, Getter } from "vuex-class";
import { instance } from "@/api/config.ts";

@Component({
  components: {
    HeaderItem,
    MenuItem,
    TabsComponent
  }
})
export default class Home extends Vue {
  @Action("getMenu") getMenu: any;
  @Getter menuList: any;
  @Getter token: any;
  created() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    });
    let data = JSON.parse(sessionStorage.getItem("state") || "{}");
    Object.keys(data).length && this.$store.replaceState(data);
    if (!this.token) {
      console.error("请先登录");
      this.$router.push("/");
    } else {
      instance.defaults.headers.common["x-auth-token"] = this.token;
      !this.menuList.length && this.getMenu();
    }
  }
}
</script>
<style lang="less">
.home {
  box-sizing: border-box;
  display: flex;
  > .main {
    box-sizing: border-box;
    background-color: #f0f2f5;
    overflow: auto;
    width: 100%;
    > .main-view {
      background: #fff;
      box-sizing: border-box;
      margin: 10px;
      height: 87.5vmin;
      overflow: auto;
      padding: 10px;
    }
  }
}
</style>