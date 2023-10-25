export type ConsumerBadges = {
  consumer_id: number
  consumer_name: string
  framework_id: number
  framework_name: string
  stage_invisible: boolean
  stage_id: number
  stage_name: string
  field1_name: string
  wisdom_badges_name: string
  digital_badge_class_id: string
  wisdom_badges_description: string
  knowledge_badges_count: number
}

export type PortalCategory = {
  portal_category_id: number
  name: string
  description: string
  image_url_path: string
  badges_count: number
}

export type PortalCategoryBadges = {
  badges: WisdomBadge[]
}

export type WisdomBadge = {
  badges_id: number
  type: string
  name: string
  description: string
  image: string
  image_author: string
  tags: string
  issuer_name: string
  issuer_url: string
  issuer_email: string
  digital_badge_class_id: string
  detail: BadgeDetail
}

export type BadgeDetail = {
  knowledge_badges_list: number[]
}
