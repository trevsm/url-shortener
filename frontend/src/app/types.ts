export interface URLItem {
  id: number
  original_url: string
  short_id: string
  views?: {
    id: number
    viewed_at: string
  }[]
  count?: number
}
