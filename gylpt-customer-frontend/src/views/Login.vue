<script>
import { instance } from "@/api/config.ts";
import api from "@/api/interface.ts";
import { mapMutations, mapActions } from "vuex";
export default {
  render () {
    return (
      <section class="bg-image">
        <section class="login">
          <h1>智慧供应链客户系统</h1>
          <a-form
            layout="horizontal"
            form={this.form}
            on-submit={this.handleSubmit}
          >
            <a-form-item
              validate-status={this.userNameError() ? "error" : ""}
              help={this.userNameError() || ""}
            >
              <a-input
                v-decorator={[
                  "userCode",
                  {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ],
                    initialValue: process.env.NODE_ENV !== 'production' ? 'admin' : ''
                  }
                ]}
                placeholder="userCode"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item
              validate-status={this.passwordError() ? "error" : ""}
              help={this.passwordError() || ""}
            >
              <a-input
                v-decorator={[
                  "password",
                  {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ],
                    initialValue: process.env.NODE_ENV !== 'production' ? '123456' : '',
                  }
                ]}
                type="password"
                placeholder="Password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                loading={this.loading}
                block
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </section>
      </section>
    );
  },
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    ...mapActions(["getExchangerateList"]),
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userCode") && getFieldError("userCode");
    },
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        try {
          if (!err) {
            // 验证通过后的操作
            this.loading = true;
            const {
              data: { userName = "", userCode = '' },
              headers: { "x-auth-token": token }
            } = await api.goLogin(values);
            token && this.setUser({ userName, token, userCode });
            sessionStorage.removeItem('state'); // 清空防止 403 bug
            instance.defaults.headers.common["x-auth-token"] = token;
            this.$router.push({ path: "/M00" });
          }
        } catch (error) {
          console.log(error);
          this.$message.error("请检查用户名或密码");
        } finally {
          this.loading = false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.bg-image {
  position: relative;
  width: 100%;
  height: 100vmin;
  // background: linear-gradient(to right bottom, #9FADEF 20%, #4393EC 60%, );
  background: url(~@/assets/images/login-background-image.jpg) no-repeat 50% 50%;
  > .login {
    position: absolute;
    left: 64.5%;
    top: 35%; 
    margin: auto;
    width: 340px;
    height: 370px;
    > h1 {
      text-align: center;
    }
  }
}
</style>
