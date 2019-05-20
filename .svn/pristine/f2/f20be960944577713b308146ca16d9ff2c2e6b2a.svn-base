var Mock = require('mockjs');
export default {
  orderList(pageIndex: number, pageSize: number) {
    return Mock.mock({
      [`list|${pageSize}`]: [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        [`orderCode|+${pageIndex}`]: ((pageIndex - 1) * pageSize) + 1,
        'businessType|+1': `Edward King`,
        'billsType|+1': 32,
        'clientName': `London, Park Lane no.`,
        'supplierName': 'London, Park Lane no.',
        'orderAggregateAmount': 'orderAggregateAmount',
        'currency': 'London, Park Lane no.',
        'orderStatus': 'London, Park Lane no.',
        'key|+1': 1 + pageIndex
      }],
      count: 100
    })
  },
  riskHandle(pageIndex: number, pageSize: number) {
    return Mock.mock({
      [`list|${pageSize}`]: [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        // [`orderCode|+${pageIndex}`]: 1 + pageIndex,
        'requestCode|+1': ((pageIndex - 1) * pageSize) + 1,
        'requestTime|+1': 32 + pageIndex,
        'requestLimit': `London, Park Lane no.`,
        'currency': 'London, Park Lane no.',
        'creditDeadline': '2019-5-14',
        'disposeSchedule': 'London, Park Lane no.',
        'remark': `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, nobis necessitatibus consectetur est explicabo repellat similique vel eligendi molestias unde tempore sit fugiat in labore. Vitae porro nostrum ducimus iusto.`,
        'key|+1': 1 + pageIndex
      }],
      count: 100
    })
  },
  commodityMsg(pageIndex: number, pageSize: number) {
    return Mock.mock({
      [`list|${pageSize}`]: [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        // [`orderCode|+${pageIndex}`]: 1 + pageIndex,
        'commodityCode|+1': ((pageIndex - 1) * pageSize) + 1,
        'commodityName|+1': 32 + pageIndex,
        'specifications': `London, Park Lane no.`,
        'unit': 'London, Park Lane no.',
        'origin': '中国深圳',
        'brand': '耐克',
        'createTime': '2019-5-14',
        'status|+1': 1 % 1 ? '启用' : '禁用',
        'key|+1': 1 + pageIndex
      }],
      count: 100
    })
  },
  supplier(pageIndex: number, pageSize: number) {
    return Mock.mock({
      [`list|${pageSize}`]: [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        // [`orderCode|+${pageIndex}`]: 1 + pageIndex,
        'supplierCode|+1': ((pageIndex - 1) * pageSize) + 1,
        'supplierName|+1': 32 + pageIndex,
        'contact': `马冬梅`,
        'ContactMethod': '139-红酒-米酒-茅台酒',
        'salesCurrency': '毛爷爷',
        'companyAddress': '广东省深圳市南山区阳光文体中心翰锐咨询有限公司',
        'createTime': '2019-5-14',
        'status|+1': 1 % 1 ? '启用' : '禁用',
        'key|+1': 1 + pageIndex
      }],
      count: 100
    })
  },
  client(pageIndex: number, pageSize: number) {
    return Mock.mock({
      [`list|${pageSize}`]: [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'clientCode|+1': ((pageIndex - 1) * pageSize) + 1,
        'clientName|+1': 32 + pageIndex,
        'contact': `马冬梅`,
        'ContactMethod': '139-红酒-米酒-茅台酒',
        'salesCurrency': '毛爷爷',
        'companyAddress': '广东省深圳市南山区阳光文体中心翰锐咨询有限公司',
        'createTime': '2019-5-14',
        'status|+1': 1 % 1 ? '启用' : '禁用',
        'key|+1': 1 + pageIndex
      }],
      count: 100
    })
  },
  // 我的资料 公司联络人
  companyContact(pageIndex: number, pageSize: number) {
    return Mock.mock({
      [`list|${pageSize}`]: [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'clientCode|+1': ((pageIndex - 1) * pageSize) + 1,
        'duty': '打杂',
        'phone|+1': 138138001380 + pageIndex,
        'mobile': '139-红酒-米酒-茅台酒',
        'Email|+1': `31051500@qq.com`,
        'wechat|+1': 310515005,
        'other': '你说啥就是啥',
        'key|+1': 1 + pageIndex
      }],
      count: 100
    })
  }
}