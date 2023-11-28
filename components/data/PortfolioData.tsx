export type PortfolioBadgeData = {
  badge_class_id: string
  consumer_id: number
  consumer_name: string
  framework_id: number
  framework_name: string
  stage_id: number
  stage_name: string
  field1_name: string
  wisdom_badges_name: string
  wisdom_badges_description: string
  knowledge_badges_count: number
  scheduled_badges_count: number
  acquired_badges_count: number
}

export type PasswordResult = {
  result: number
}

export type ConsumerBadgesRequest = {
  framework_id: number
  stage_id: number
  password: string
}
