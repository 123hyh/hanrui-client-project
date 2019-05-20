<template>
  <a-drawer
    title="新增"
    :width="720"
    @close="onClose"
    :visible="drawerVisible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px', textAlign: 'center'}"
  >
    <form-component
      :formData='formData'
      :layout='50'
      @form='formBlock'
    ></form-component>
    <div :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }">
      <a-button
        :style="{marginRight: '8px'}"
        @click="onClose('close')"
      >
        取消
      </a-button>
      <a-button
        @click="onClose('submit')"
        type="primary"
      >提交</a-button>
    </div>
  </a-drawer>
</template>
<script>
import FormComponent from '@/components/common/FormComponent.vue'
export default {
  components: {
    FormComponent
  },
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onClose (type) {
      this.$emit('closeDrawer',type);
    },
    formBlock (form) {
      this.$emit('formBlock', form)
    }
  },
}
</script>

