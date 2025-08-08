export interface WeChatConfig {
  fakeid: string
  token: string
  cookie: string
}

export interface AppConfig {
  wechat: WeChatConfig
  staticPath: string
  imagesPath: string
}