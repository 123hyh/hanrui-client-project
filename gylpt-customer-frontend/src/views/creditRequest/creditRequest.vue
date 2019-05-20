<template>
  <div class="creditRequest">
    <div class="main">
      <h1 style="text-align: center;margin-top: 50px">授信申请书</h1>
      <form-component
        @form='formBlock'
        :formData="formData"
        :layout="100"
      />
      <btn-component @btnClick='sendData'></btn-component>
    </div>
  </div>
</template>

<script lang='tsx'>
import { Vue, Component, Prop } from "vue-property-decorator";
import FormComponent from "@/components/common/FormComponent.vue";
import BtnComponent from "@/components/common/BtnComponent.vue";
import api from "@/api/interface.ts";
import utools from "@/utils/uTools.ts";
import formData from "@/testData/creditRequest/creditRequest.ts";
@Component({
  components: {
    FormComponent,
    BtnComponent
  }
})
export default class creditRequest extends Vue {
  public formData = {
    applyCompanyName: {
      type: "string",
      ui: {
        label: "申请公司"
      }
    },
    guaranteeCompanyName: {
      type: "string",
      ui: {
        label: "担保公司"
      }
    },
    applyAmount: {
      type: "string",
      ui: {
        label: "综合授信额度"
      }
    },
    DurationOfApplication: {
      type: "timeRange",
      ui: {
        label: "授信期限"
      }
    },
    bussnessType: {
      type: "string",
      ui: {
        label: "业务类别"
      }
    },
    currency: {
      // type: "select",
      type: "string",
      ui: {
        label: "币别",
        options: []
      }
    },
    collateral: {
      // type: "select",
      type: "string",
      ui: {
        label: "抵押物名称",
        options: []
      }
    },
    accessory: {
      type: "upload",
      ui: {
        label: "附件上传"
        // headers: { authorization: "authorization-text" }
      }
    },
    applyReason: {
      type: "textarea",
      ui: {
        placeholder: "申请原因"
      }
    }
  };
  @Prop({
    type: Object,
    default: () => ({})
  })
  clickRow: any;
  public form: any = {};
  public submitCode = ""; // 点击保存后 取code 为下次 点击提交带上
  public mounted() {
    Object.keys(this.clickRow).length &&
      this.form.setFieldsValue({
        ...this.clickRow
      }),
      (this.submitCode = this.clickRow.applyNo);
  }
  public btnClick(target: string) {
    this.form.validateFields((err: any, val: any) => {
      !err && console.log(val);
    });
  }
  public formBlock(form: any) {
    this.form = form;
  }
  public sendData(target: string) {
    if(target === 'submit' && !this.submitCode){
      this.$message.warning('请先保存数据')
      return;
    }
    let port: any = {
      save: "changeCreditRequest",
      submit: "submitCreditapply"
    };
    this.form.validateFields(async (err: any, val: any) => {
      try {
        if (!err) {
          val = {
            ...val,
            creditBegin: utools.formatDate(val.DurationOfApplication[0]),
            creditEnd: utools.formatDate(val.DurationOfApplication[1]),
            applyAmount: +val.applyAmount
          };
          this.submitCode &&
            ((val.clientApplyNo = this.submitCode),
            (val.applyNo = this.submitCode));
          // 发送 请求
          const {
            data: { clientApplyNo },
            status
          } = await api[port[target]]({
            method:
              (target === "submit" && this.submitCode) || !this.submitCode
                ? "POST"
                : "PUT",
            data: val
          });
          status === 200 && this.$message.success("操作成功");
          clientApplyNo && (this.submitCode = clientApplyNo);
        }
      } catch (error) {
        this.$message.error("操作失败,请重试");
        console.log(error);
      }
    });
  }
}
</script>
<style lang="less" scoped>
.creditRequest {
  // height: 100%;
}
.main {
  width: 50%;
  margin: auto;
  line-height: 100%;
  .flex-layout {
    margin: 10px 0;
  }
}
.btn-layout {
  text-align: center;
}
</style>