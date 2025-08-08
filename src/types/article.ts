export interface FetchOptions {
  fakeid: string
  token: string
  cookie: string
  begin?: number
  count?: number
  query?: string
}

export interface FetchResponse {
  isOK: boolean
  list: ArticleItem[]
  count: number
  error: any
}

export interface ArticleItem {
  aid: string
  album_id: string
  appmsg_album_infos: any[]
  appmsgid: number
  audio_info?: {
    audio_infos: {
      audio_id: string
      masssend_audio_id: string
      play_length: number
      title: string
      trans_state: number
      voice_verify_state: number
    }[]
  }
  author_name: string
  checking: number
  copyright_type: number
  cover: string
  create_time: number
  digest: string
  has_red_packet_cover: number
  is_pay_subscribe: number
  item_show_type: number
  itemidx: number
  link: string
  media_duration: string
  mediaapi_publish_status: number
  pay_album_info: {
    appmsg_album_infos: any[]
  }
  tagid: any[]
  title: string
  update_time: number
}

export interface ParsedArticle {
  news: string[]
  image: string
  tip: string
  cover: string
  audio: {
    music: string
    news: string
  }
}

export interface SavedData {
  date: string
  news: string[]
  audio: {
    music: string
    news: string
  }
  image: string
  tip: string
  cover: string
  link: string
  created: string
  created_at: number
  updated: string
  updated_at: number
}