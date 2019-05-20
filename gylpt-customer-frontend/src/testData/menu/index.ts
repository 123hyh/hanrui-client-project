export default [
  { name: "首页", icon: "home", path: "/index" },
  {
    name: "快捷下单",
    icon: "home",
    children: [
      { name: "订单列表", icon: "home", path: "/orderList" }, 
      { name: "进口委托订单", path: "/entranceEntrustBills" },
      { name: "出口委托订单", path: "/exitEntrustBills" },
      { name: "转口委托订单", path: "/reExportsEntrustBills" },
      { name: "国内委托订单", path: "/domesticEntrustBills" },
    ]
  },
  {
    name: "财务管理",
    icon: "home",
    children: [
      { name: "付款查询", icon: "home", path: "/paymentQuery" },
      { name: "费用查询", icon: "home", path: "/costQuery" },
      { name: "欠款查询", icon: "home", path: "/debtQuery" },
    ]
  },
  {
    name: "授信申请",
    icon: "home",
    children: [
      { name: "授信申请", icon: "home", path: "/creditRequest" }, 
      { name: "风控处理", icon: "home", path: "/riskHandle" }
    ]
  },
  {
    name: "我的商家",
    icon: "home",
    children: [
      { name: "商品信息", icon: "home", path: "/commodityMsg" }, 
      { name: "供应商", icon: "home", path: "/supplier" }, 
      { name: "客户", icon: "home", path: "/client" }]
  },
  {
    name: "信息中心",
    icon: "home",
    children: [
      { name: "我的资料", icon: "home", path: "/myData" },
      { name: "信息节点", icon: "home", path: "/msgNode" },
    ]
  },
]