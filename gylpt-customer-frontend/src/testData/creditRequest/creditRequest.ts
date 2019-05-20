export default {
  "ApplicationCompany": {
    "type": "string",
    "ui": {
      "label": "申请公司"
    }
  },
  "WarrantyCompany": {
    "type": "string",
    "ui": {
      "label": "担保公司"
    }
  },
  "AmountOfApplication": {
    "type": "string",
    "ui": {
      "label": "综合授信额度"
    }
  },
  "DurationOfApplication": {
    "type": "timeRange",
    "ui": {
      "label": "授信期限"
    }
  },
  "BusinessCategories": {
    "type": "string",
    "ui": {
      "label": "业务类别"
    }
  },
  "currency": {
    "type": "select",
    "ui": {
      "label": "业务类别",
      "options": []
    }
  },
  "collateral": {
    "type": "select",
    "ui": {
      "label": "币别",
      "options": []
    }
  },
  "accessory ": {
    "type": "upload",
    "ui": {
      "label": "附件上传",
      headers: { authorization: 'authorization-text', }
    }
  },
  "requestCause": {
    "type": "textarea",
    "ui": {
      'placeholder': '申请原因'
    }
  },
}