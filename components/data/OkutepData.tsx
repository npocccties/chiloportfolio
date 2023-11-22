export type ConsumerGoal = {
  consumer_id: number
  consumer_name: string
  framework_id: number
  framework_name: string
  stage_id: number
  stage_name: string
  field1_name: string
}

export type ConsumerBadge = {
  consumer_id: number
  consumer_name: string
  framework_id: number
  framework_name: string
  stage_id: number
  stage_name: string
  field1_name: string
  wisdom_badges_name: string
  digital_badge_class_id: string
  wisdom_badges_description: string
  knowledge_badges_count: number
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
