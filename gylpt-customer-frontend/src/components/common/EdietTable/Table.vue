<template>
  <!-- 可编辑表格 -->
  <div>
    <a-table
      :columns="table.config"
      :dataSource="data"
      bordered
      :pagination='false'
    >
      <template
        v-for="col in configKey"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template
        slot="operation"
        slot-scope="text, record, index"
      >
        <div class='editable-row-operations'>
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a-popconfirm
              title='取消修改吗?'
              okText='确定'
              cancelText='取消'
              @confirm="() => cancel(record.key)"
            >
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">编辑</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  computed: {
    configKey () {
      return this.table.config.map(item => (item.dataIndex))
    },
  },
  watch: {
    'table.list': {
      handler (cur, pre) {
        Array.isArray(cur) &&
          // 深克隆赋值到data
          (this.data = cur.map(item => ({ ...item })));
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    table: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      data: [],
    }
  },
  methods: {
    handleChange (value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      // this.$emit('tableEdit', {type: 'edit', key})
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const target = this.data.filter(item => key === item.key)[0];
      delete target.editable;
      this.data = [...this.data];
      this.$emit('setTableRowData', { data: { ...target }, key })
    },
    cancel (key) {
      const newData = [...this.table.list];
      const target = newData.filter(item => key === item.key)[0];
      let index = this.data.findIndex(item => item.key === key);
      this.data[index] = { ...target };
      this.data = [...this.data]
    },
    handleAdd () {
      const newData = {
        key: Math.random(),
        name: `Edward King ${1}`,
        age: 32,
        address: `London, Park Lane no. ${1}`,
        operation: `xxxx`,
      }
      this.data.unshift(newData)
    },
  },
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>