<template>
  <div class="header">
    <header>
      <!-- <div><a-icon @click.stop="handleOpenMenu" :type="collapsed ? 'menu-unfold' : 'menu-fold'" /></div> -->
      <div class="float-right-pad">
        <span class="icon-style">
          <a-popover placement="bottomRight">
            <template slot="content">
              <div style="width:200px">
                <p v-bg-highlight>Content</p>
                <p>Content</p>
              </div>
            </template>
            <template slot="title">
              <span>Title</span>
            </template>
            <a-icon type="bell"/>
          </a-popover>
        </span>
        <span class="user-message">
          <a-icon type="github" class="icon-style"/>
          <span>管理员</span>
          <ul class="user-function">
            <li v-for="({icon,html},key,i) in userLIst" :key="i" @click.stop="userOperation(key)">
              <a-icon style="font-size: 20px;" :type="icon"/>
              <span>{{html}}</span>
            </li>
          </ul>
        </span>
      </div>
    </header>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Emit } from "vue-property-decorator";
@Component
export default class HeaderItem extends Vue {
  public userLIst = {
    resetPassword: {
      icon: "key",
      html: "修改密码"
    },
    logout: {
      icon: "logout",
      html: "退出登录"
    }
  };
  public collapsed: boolean = true;
  @Emit("handleOpenMenu") handleOpenMenu() {
    this.collapsed = !this.collapsed;
    return this.collapsed;
  }
  // 用户操作
  public userOperation(target: string) {
    this.$message.success(target);
  }
}
</script>
<style lang="less" scoped>
.layout {
  display: flex;
  font-size: 25px;
  align-items: center;
  height: 100%;
  > div {
    margin-left: 20px;
    cursor: pointer;
  }
}
.header {
  position: relative;
  box-sizing: border-box;
  padding: 5px;
  box-shadow: 0 2px #f3f4f5;
  height: 10vmin;
  line-height: 10vmin;
  background: #fff;
  border-bottom: 1px solid #f3f4f5;
}
header::after {
  display: inline-block;
  content: "";
}
.icon-style {
  box-sizing: border-box;
  font-size: 25px;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  margin-right: 20px;
  display: inline-block;
  // margin: auto
}
.float-right-pad {
  float: right;
  margin-right: 50px;
}
.user-message {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
}
.user-message:hover .user-function {
  display: block;
}
.user-function {
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  display: none;
  width: 120px;
  background: #fff;
  position: absolute;
  top: 50px;
  right: -30px;
  z-index: 50;
  box-shadow: 0px 0px 5px 5px #dfdfdf;
  & > li {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &:hover {
      background: rgb(235, 246, 252);
    }
    > span {
      margin-left: 10px;
    }
  }
}
</style>