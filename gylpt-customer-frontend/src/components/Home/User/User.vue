<template>
  <div data-key='User'>
    <ul class="user-function">
      <li @click.stop="resetPassword">
        <a-icon type="setting" /><span>修改密码</span></li>
      <li @click.stop="logout">
        <a-icon type="logout" /><span>退出登录</span></li>
    </ul>
    <a-modal
      title="修改密码"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <form-component
        :formData='fromData'
        :layout='100'
        @form='initForm'
      ></form-component>
    </a-modal>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import FormComponent from "@/components/common/FormComponent.vue";
import api from "@/api/interface.ts";
import { instance } from "@/api/config.ts";
import { Mutation, State, Getter } from "vuex-class";
const rules = [{ required: true, message: "必填" }];
@Component({
  components: {
    FormComponent
  }
})
export default class User extends Vue {
  public fromData = {
    oldPassword: {
      type: "string",
      isEncryption:true,
      ui: {
        rules,
        label: "旧密码"
      }
    },
    newPassword: {
      type: "string",
      isEncryption:true,
      ui: {
        label: "新密码",
        rules
      }
    }
  };
  public form: any = {};
  public visible: boolean = false;
  public confirmLoading: boolean = false;
  @Getter("userCode") userCode: any;
  @Mutation("resetSate")
  resetUserState: any;
  @Mutation resetMenuList: any;
  public resetPassword() {
    this.visible = true;
  }
  // 初始化 form弹窗
  public initForm(data: Vue) {
    this.form = data;
  }
  // 退出登录
  public async logout() {
    try {
      const { status } = await api.goLogout();
      /^20/.test(status) &&
        (Promise.all([this.resetMenuList(), this.resetUserState()]),
        this.$router.push("/"));
    } catch (error) {
      this.$message.error("退出登录失败,请重试");
      console.log(error);
    }
  }
  // 修改密码的操作
  public async handleOk() {
    this.confirmLoading = true;
    this.form.validateFields(
      async (err: any, value: { newPassword: string; oldPassword: string }) => {
        try {
          if (!err) {
            const { status } = await api.resetPassword({
              ...value,
              userCode: this.userCode
            });
            status === 200 &&
              ((this.visible = false),
              this.$message.success("修改成功，请重新登录"),
              delete instance.defaults.headers.common["x-auth-token"],
              // instance.defaults.headers.common.delete["x-auth-token"] = token
              this.resetUserState(),
              this.$router.push("/"));
          } else {
            this.confirmLoading = false;
          }
        } catch (error) {
          this.$message.error("修改失败，请重试");
          console.log(error);
        }
      }
    );
  }
  // 关闭弹窗
  public handleCancel() {
    this.visible = false;
  }
}
</script>
<style lang="less" scoped>
.user-function {
  border-radius: 5px;
  padding: 0;
  list-style: none;
  display: none;
  width: 120px;
  background: #fff;
  position: absolute;
  top: 5vmin;
  right: -20px;
  z-index: 50;
  box-shadow: 0px 0px 5px 5px #dfdfdf;
  > li {
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      margin-left: 10px;
    }
    &:hover {
      background: #f0f2f5;
    }
  }
}
</style>
