<template>
  <div class="msg-node-view">
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <!-- item -->
      <div
        v-for="(val, key, index) in formConfig"
        :key="index"
      >
        <a-divider
          v-if='val.title'
          orientation="left"
        >{{val.title}}</a-divider>
        <div class="form-item-layout">
          <div
            class="form-item-layout set-height"
            v-for="(v,k,i) in val.item"
            :key="i"
          >
            <a-form-item
              v-if="v.type==='radio'"
              :label="val.label"
              class="form-item-layout label-item"
            >
              <a-radio-group v-decorator="[k]">
                <a-radio :value="1">信息发送</a-radio>
                <a-radio :value="2">关闭信息</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item v-if="v.type === 'string'">
              <a-input v-decorator="[k]" />
            </a-form-item>
          </div>
        </div>
      </div>
    </a-form>
    <BtnComponent></BtnComponent>
  </div>
</template>
<script >
import BtnComponent from '@/components/common/BtnComponent.vue'
export default {
  components:{
    BtnComponent
  },
  data () {
    return {
      form: this.$form.createForm(this),
      formConfig: {
        payment: {
          title: '付汇',
          label: '已安排付款',
          item: {
            node: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            Note: {
              type: 'string',
              ui: {
              }
            }
          }
        },
        water: {
          label: '水单已上伟',
          item: {
            waterNode: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            waterNote: {
              type: 'string',
              ui: {
              }
            }
          }
        },
        order: {
          title: '订单动态',
          label: '香港收货',
          item: {
            orderNode: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            orderNote: {
              type: 'string',
              ui: {
              }
            }
          }
        },
        customs: {
          label: '报关完成',
          item: {
            customsNode: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            customsrNote: {
              type: 'string',
              ui: {
              }
            }
          }
        },
        goodsToSz: {
          label: '货到深圳',
          item: {
            goodsToSzNode: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            goodsToSzNote: {
              type: 'string',
              ui: {
              }
            }
          }
        },
        szOutWarehouseSelf: {
          label: '深圳已出库(自提)',
          item: {
            szOutWarehouseSelfNode: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            szOutWarehouseSelfNote: {
              type: 'string',
              ui: {
              }
            }
          }
        },
        szOutWarehouseSupply: {
          label: '深圳已出库(供应链送货)',
          item: {
            szOutWarehouseSupplyNode: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            szOutWarehouseSupplyNote: {
              type: 'string',
              ui: {
              }
            }
          }
        },
        szOutWarehouseThird: {
          label: '深圳已出库(第三方物流)',
          item: {
            szOutWarehouseThirdNode: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            szOutWarehouseThirdyNote: {
              type: 'string',
              ui: {
              }
            }
          }
        },
        adviceOfPayment: {
          label: '付款通知书',
          title: '付款通知书',
          item: {
            adviceOfPaymentNode: {
              type: 'radio',
              ui: {
                radioOptions: [{ itemKey: '1', itemVal: '信息发送' }, { itemKey: '2', itemVal: '关闭信息' }],
              }
            },
            adviceOfPaymentNote: {
              type: 'string',
              ui: {
              }
            }
          }
        },
      }
    }
  },
  methods: {
    handleSubmit () {
    }
  }
}
</script>
<style lang="less" scoped>
.msg-node-view {
  margin: auto;
  box-sizing: border-box;
  /*  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  width: 700px;
}
.form-item-layout {
  display: flex;
}
.label-item {
  margin-bottom: 0;
  > :first-child {
    width: 200px;
    text-align: left;
  }
}
.set-height{
  height: 40px;
}
input[type="text"]{
  width: 300px;
}
.btn-layout{
  text-align: center
}
</style>