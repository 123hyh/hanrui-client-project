<template>
  <div>
    <a-table
      :columns="table.config"
      :dataSource="data"
      bordered
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
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm
              title='Sure to cancel?'
              @confirm="() => cancel(record.key)"
            >
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [{
  title: 'name',
  dataIndex: 'name',
  width: '25%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'age',
  dataIndex: 'age',
  width: '15%',
  scopedSlots: { customRender: 'age' },
}, {
  title: 'address',
  dataIndex: 'address',
  width: '40%',
  scopedSlots: { customRender: 'address' },
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}]

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}
export default {
  computed: {
    configKey () {
      return this.table.config.map(item => (item.dataIndex))
    }
  },
  props: {
    table: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    this.cacheData = this.table.list.map(item => ({ ...item }))
    return {
      data: this.table.list.map(item => ({ ...item })),
      columns,
    }
  },
  methods: {
    handleChange (value, key, column) {
      const newData = [...this.data]
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
      this.$emit('setTableRowData', { data: target, key })
    },
    cancel (key) {
      debugger
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
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