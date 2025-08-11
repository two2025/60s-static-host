export const WECHAT_FAKEIDS = {
  每天60秒读懂世界: 'MzkwNDc5NTA0Mw==',
  每天3分钟读懂世界: 'MzkwNjY1ODIxNw==',
  每天1分钟读世界: 'Mzk3NTMzOTU1Mg==',
} as const

export const DEFAULT_WECHAT_FAKEID = WECHAT_FAKEIDS['每天1分钟读世界']

export const REGEX_PATTERNS = {
  TIP: /^【((微语)|(每日金句))】/,
  NEWS: /^\d+、/,
  END: /[；！～。，]\s*$/,
  DATE_FORMAT: /^\d{4}-\d{2}-\d{2}$/,
} as const

export const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'

export const PATHS = {
  STATIC_60S: 'static/60s',
  STATIC_IMAGES: 'static/images',
} as const
