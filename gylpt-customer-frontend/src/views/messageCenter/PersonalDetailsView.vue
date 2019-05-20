<script type='tsx'>
import { Vue, Component } from 'vue-property-decorator'
import TableComponent from '@/components/common/TableComponent.vue'
import BtnComponent from '@/components/common/BtnComponent.vue'
import PaginationComponent from "@/components/common/PaginationComponent.vue";

import tableData from "@/testData/tableData.ts";

import api from "@/api/interface.ts";
@Component({
  components: {
    TableComponent,
    BtnComponent,
    PaginationComponent
  }
})
export default class PersonalDetailsView extends Vue {

  myDataKey = {
    'code': '编码',
    'companyName': '公司名称',
    'legalPerson': '法人代表',
    'companyNature': '公司性质',
    'companyTel': '公司电话',
    'businessSite': '营业执照地址',
    'registerFund': '注册资金',
    'registerCurreny': '注册币种',
    'creditCode': '信用代码',
    'customsRegisterCode': '海关注册编码',
    'operationsSpecialist': '业务专员',
    'businessCommissioner': '商务专员',
    'openBank': '开户银行',
    'bankAccount': '银行帐号',
    'accountName': '帐户名称',
    'accountCurreny': '帐户币别',
    'consigneeRegion': '收货地区',
    'consignee': '收货人',
    'tel': '联系方式',
    'consigneeSite': '收货地址'
  };
  data = {
    code: '410420121568',
    companyName: '得鑫科技（深圳）有限公司',
    legalPerson: '张强',
    companyNature: '股份有限公司',
    companyTel: '0755-22338877',
    businessSite: '深圳市南山区学府路1号',
    registerFund: '2000万元',
    registerCurreny: '人民币',
    creditCode: '201504010012',
    customsRegisterCode: 'HG201504010012',
    operationsSpecialist: '李思',
    businessCommissioner: '刘语彤',
    openBank: '中国银行',
    bankAccount: '0023776622348877',
    accountName: '帐户名称',
    accountCurreny: '人民币',
    consigneeRegion: '深圳市南山区',
    consignee: '刘五',
    tel: '13612345678',
    consigneeSite: '深圳南山区学府路1号'
  };
  btnList = [
    { label: "新增", key: "create" },
    { label: "修改", key: "update" },
    { label: '删除', key: 'remove' }
  ];
  table = {
    list: [],
    count: 0,
    config: [
      {
        title: "联系人",
        dataIndex: "clientCode",
        width: 200
      }, {
        title: "职务",
        dataIndex: "duty",
        width: 200
      }, {
        title: "电话",
        dataIndex: "phone",
        width: 200
      }, {
        title: "手机",
        dataIndex: "mobile",
        width: 200
      }, {
        title: "E-mail",
        dataIndex: "Email",
        width: 200
      }, {
        title: "微信/QQ",
        dataIndex: "wechat",
        width: 200
      }, {
        title: '其他',
        dataIndex: 'other',
        width: 200
      }
    ],
    loading: false
  };
  created () {
    this.getTableData();
  };
  render () {
    return (
      <div>
        <h3>个人资料</h3>
        <div class='layout layout-pad'>
          {
            Object.keys(this.myDataKey).map((item, i) => <div class='layout layout-width'>
              <h4>{`${this.myDataKey[item]}：`}</h4>
              <p>{this.data[item]}</p>
            </div>)
          }
        </div>
        <a-divider />
        <h3>我司联络人</h3>
        <btn-component btnList={this.btnList} />
        <TableComponent table={this.table} on-tableAllEvent={this.tableAllEvent} />
        <pagination-component total={this.table.count} on-pageChange={this.getTableData} />
      </div>
    )
  };
  async getTableData (data) {
    this.table.loading = true;
    try {
      const { list, count } = await api.getCompanyContact(data);
      this.table = { ...this.table, list, count };
    } catch (error) {
      console.log(error);
    } finally {
      this.table.loading = false;
    }
  };
  // 当前点击行数据
  tableAllEvent ({ currentRowData }) {
    debugger
  }
}
</script>
<style lang="less" scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
}
.layout-pad {
  box-sizing: border-box;
  padding: 50px;
}
.layout-width {
  flex-basis: 25%;
  > h4 {
    flex-basis: 40%;
  }
  > p {
    flex-basis: 60%;
  }
}
</style>