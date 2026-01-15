# 60s 每日新闻 API

![Update Status](https://github.com/two2025/60s-static-host/workflows/schedule/badge.svg)

自动化每日新闻聚合服务，通过多个 CDN 提供 JSON 数据和图片访问。

**🔗 项目主页**: https://60s-static.two2025.moe

## 快速开始

### API 端点

将 `[date]` 替换为 `YYYY-MM-DD` 格式的日期，例如 `2025-10-24`

**JSON 数据:**
```
https://60s-static.viki.moe/60s/[date].json
https://cdn.jsdelivr.net/gh/two2025/60s-static-host@main/static/60s/[date].json
https://cdn.jsdmirror.com/gh/two2025/60s-static-host@main/static/60s/[date].json
```

**PNG 图片:**
```
https://60s-static.viki.moe/images/[date].png
https://cdn.jsdelivr.net/gh/two2025/60s-static-host@main/static/images/[date].png
https://cdn.jsdmirror.com/gh/two2025/60s-static-host@main/static/images/[date].png
```

### 示例请求

```bash
# 获取 2025-10-24 的新闻数据
curl https://60s-static.two2025.moe/60s/2025-10-24.json

# 获取对应的图片
curl https://cdn.jsdmirror.com/gh/two2025/60s-static-host@main/static/images/2025-10-24.png
```

## 数据格式

```json
{
  "date": "2025-10-24",
  "news": [
    "新闻条目 1",
    "新闻条目 2",
    "..."
  ],
  "cover": "https://...",
  "image": "https://...",
  "tip": "每日金句",
  "link": "https://...",
  "created": "2025/10/24 06:30:00",
  "created_at": 1736900400000,
  "updated": "2025/10/24 06:30:00",
  "updated_at": 1736900400000
}
```

**字段说明:**

| 字段 | 类型 | 说明 |
|------|------|------|
| `date` | string | 日期 (YYYY-MM-DD) |
| `news` | string[] | 新闻列表 (~15条) |
| `cover` | string | 封面图片 URL |
| `image` | string | 生成的新闻卡片图片 URL |
| `tip` | string | 每日金句 |
| `link` | string | 原文链接 |
| `created` | string | 创建时间 (可读格式) |
| `created_at` | number | 创建时间戳 (毫秒) |
| `updated` | string | 更新时间 (可读格式) |
| `updated_at` | number | 更新时间戳 (毫秒) |

## 更新时间

数据每日自动更新，时间窗口: **00:00 - 10:00 (UTC+8)**

## License

[MIT](license) License © 2022-PRESENT Viki

---

**⚠️ 免责声明**: 数据来源于公开网络，不保证准确性。本项目与任何新闻机构无关联。
