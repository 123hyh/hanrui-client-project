<template>
  <div id="components-modal-demo-position">
    <a-modal
      title="选择数据"
      style="top: 20px;"
      width='50%'
      cancelText='取消'
      okText='确定'
      :visible="isShowDialog"
      @ok="() => setModalVisible(true)"
      @cancel="() => setModalVisible(false)"
    >
      <table-component
        :table='table'
        @tableAllEvent='tableAllEvent'
      ></table-component>
    </a-modal>
  </div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent.vue'
export default {
  components: {
    TableComponent
  },
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    table: {
      type: Object,
      default: () => ({
        list: [],
        config: [],
        count: 0,
        loading: false
      })
    }
  },
  data () {
    return {
      activeRowData: {}
    }
  },
  methods: {
    setModalVisible (type) {
      if (type) {
        Object.keys(this.activeRowData).length ? this.$emit('dialogVisible', { rowData: this.activeRowData, isVisible: false }) : this.$message.warning('请选择一条数据')
      } else {
        this.$emit('dialogVisible', { isVisible: false });
      }
      this.activeRowData = {};
    },
    tableAllEvent ({ currentRowData, ...param }) {
      currentRowData && (this.activeRowData = currentRowData);
    }
  }
}
</script>