# 60s Static Data Host

![Update Status](https://github.com/vikiboss/60s-static-host/workflows/schedule/badge.svg)

A lightweight repository hosting daily news data, automatically updated via GitHub Actions.

## Overview

- 🔄 Auto-updates daily
- 📰 Stores curated news data
- 🚀 Fast static hosting
- 🔑 Easy data access
- 📊 JSON format

## Usage

Access the latest data through:

```url
# https://raw.githubusercontent.com/vikiboss/60s-static-host/refs/heads/main/static/60s/2025-02-08.json

https://raw.githubusercontent.com/vikiboss/60s-static-host/refs/heads/main/static/60s/[yyyy]-[MM]-[dd].json
```

## Features

- Automated daily data collection
- Static file hosting via GitHub
- Version controlled data history
- Zero maintenance required
- REST API friendly format

## Data Format

All data is stored in JSON format with consistent structure, for example:

```json
{
  "date": "2025-02-08",
  "news": [
    "证监会：增强资本市场制度的包容性，支持优质科技型企业发行上市",
    "教育部：学校应每学期核准一次学生学籍，严肃处理人籍分离、空挂学籍等问题",
    "重庆：完善个人住房房产税试点政策，不再将市外人员购买普通住宅纳入征税范围",
    "27座万亿GDP城市成绩单出炉：19城经济增速超全国水平，泉州领跑，总量方面，上海、北京、深圳、重庆、广州、苏州、成都、杭州、武汉和南京排在前十位",
    "台媒：高雄惊现分尸案，确定3名女性遇害，73岁嫌犯被羁押",
    "老挝：已对向缅甸大其力地区供电作出限制；外交部：中国正同泰缅等周边国家合作，共同铲除网赌、电诈毒瘤",
    "泰国6日接收了61名被诱骗至缅甸电诈园区的外籍人员，包括39名中国公民",
    "马斯克警告：若不立即改革过时的武器项目，美国将在未来战争中面临重大失败的风险",
    "当地6日，美国阿拉斯加州一架载有10人的飞机失踪",
    "特朗普：将签署命令，停止推广纸质吸管，\"重新回到塑料\"；美联邦法官裁定特朗普废除\"出生公民权\"行政令违宪",
    "美国：将对国际刑事法院实施制裁，因其对美以\"采取非法且无根据的行动\"，国际刑事法院回应：谴责美方相关行为",
    "印媒：印度总理莫迪将应邀于2月12日至13日访美，并与特朗普会谈",
    "外媒：俄罗斯经济创历史新高，2024年GDP增长4.1%，达到历史最高水平的200万亿卢布",
    "伊朗革命卫队接收首艘本土研发无人机航母，可搭载隐身无人机，该舰作战半径为22000海里，可在海上一年无需加油",
    "以色列总理内塔尼亚胡：沙特的国土面积很大，巴勒斯坦人可去沙特领土上建国"
  ],
  "audio": {
    "music": "https://res.wx.qq.com/voice/getvoice?mediaid=MzU2MDU4NDE1MV8yMjQ3NTI4MDY4",
    "news": "https://res.wx.qq.com/voice/getvoice?mediaid=MzU2MDU4NDE1MV8yMjQ3NTI4MDY5"
  },
  "tip": "世界不会因为你而难过，我们终将学会与自己好好相处",
  "cover": "https://mmbiz.qlogo.cn/sz_mmbiz_jpg/ftdBHhoElSWicqiajvS2g1YickCW5ibS7Dibibh5StGA4r00QjjYVibEA26XHlhZnORDtMgiaWm1PnnA2Zl0gbnd1pNswg/0?wx_fmt=jpeg",
  "link": "http://mp.weixin.qq.com/s?__biz=MzU2MDU4NDE1MQ==&mid=2247528070&idx=1&sn=81488ae3744998019e736084915b09fb",
  "created": "2025/02/08 00:55:34",
  "created_at": 1738947334000,
  "updated": "2025/02/08 00:55:33",
  "updated_at": 1738947333000
}
```

## License

MIT
