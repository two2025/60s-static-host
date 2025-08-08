import { WeChatConfig } from '../types/index.js'
import { DEFAULT_WECHAT_FAKEID } from './constants.js'
import { validateRequiredEnv } from '../utils/index.js'

export function getWeChatConfig(): WeChatConfig {
  const fakeid = process.env.WECHAT_FAKEID || DEFAULT_WECHAT_FAKEID
  const token = process.env.WECHAT_TOKEN || ''
  const cookie = process.env.WECHAT_COOKIE || ''

  validateRequiredEnv({ 
    WECHAT_TOKEN: token, 
    WECHAT_COOKIE: cookie 
  })

  return { fakeid, token, cookie }
}