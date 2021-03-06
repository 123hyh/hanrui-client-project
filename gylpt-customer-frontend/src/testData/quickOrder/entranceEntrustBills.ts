export default {
  /*   "supplier": {
      "type": "string",
      "ui": {
        "label": "供应商"
      }
    }, */
  "supplier": {
    "type": "btnSearch",
    "ui": {
      "label": "供应商"
    }
  },
  "client": {
    "type": "btnSearch",
    "ui": {
      "label": '客户'
    }
  },
  'sellCurrency': {
    'type': 'select',
    'ui': {
      'label': '销售币别',
      'options': [
        { itemKey: '1', itemVal: '美金' },
        { itemKey: '2', itemVal: '港币' },
        { itemKey: '3', itemVal: '日元' },
      ]
    }
  },
  'deliveryWay': {
    'type': 'select',
    'ui': {
      'label': '交货方式',
      'options': [
        { itemKey: '1', itemVal: '美金' },
        { itemKey: '2', itemVal: '港币' },
        { itemKey: '3', itemVal: '日元' },
      ]
    }
  },
  procurementCurrency: {
    'type': 'select',
    'ui': {
      'label': '采购币别',
      'options': [
        { itemKey: '1', itemVal: '美金' },
        { itemKey: '2', itemVal: '港币' },
        { itemKey: '3', itemVal: '日元' },
      ]
    }
  },
  ReceivingGoodsWay: {
    'type': 'select',
    'ui': {
      label: '收货方式',
      options: [
        { itemKey: '1', itemVal: '美金' },
        { itemKey: '2', itemVal: '港币' },
        { itemKey: '3', itemVal: '日元' },
      ]
    }
  }
}