import { DEFAULT_WECHAT_FAKEID } from './constants'
import { validateRequiredEnv } from '../utils'

import type { WeChatConfig } from '../types'

export function getWeChatConfig(): WeChatConfig {
  const fakeid = process.env.WECHAT_FAKEID || DEFAULT_WECHAT_FAKEID
  const token = process.env.WECHAT_TOKEN || ''
  const cookie = process.env.WECHAT_COOKIE || ''

  validateRequiredEnv({
    WECHAT_TOKEN: token,
    WECHAT_COOKIE: cookie,
  })

  return { fakeid, token, cookie }
}
