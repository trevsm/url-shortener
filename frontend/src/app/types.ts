export interface URLItem {
  id: number
  title?: string
  original_url: string
  short_id: string
  views?: {
    id: number
    viewed_at: string
    ip_address: string
  }[]
  count?: number
}

export interface ViewItem {
  id: number
  viewed_at: string
  ip_address: string
}
