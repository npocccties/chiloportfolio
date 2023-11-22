import { ConsumerBadge, ConsumerGoal } from "@/components/data/OkutepData"
import { WalletBadge } from "@/components/data/WalletData"
import { PortfolioBadgeData } from "@/components/data/PortfolioData"

export function mergeBadgeDataWithConsumer(consumerBadges: ConsumerBadge[], walletBadges: WalletBadge[]): PortfolioBadgeData[] {
  var badgeDatas: PortfolioBadgeData[] = []
  if (!consumerBadges || !walletBadges || consumerBadges.length == 0 || walletBadges.length == 0) {
    return badgeDatas
  }
  for (const [i, consumerBadge] of consumerBadges.entries()) {
    var badgeData: PortfolioBadgeData = {
      consumer_id: consumerBadge.consumer_id,
      consumer_name: consumerBadge.consumer_name,
      framework_name: consumerBadge.framework_name,
      framework_id: consumerBadge.framework_id,
      stage_id: consumerBadge.stage_id,
      stage_name: consumerBadge.stage_name,
      field1_name: consumerBadge.field1_name,
      wisdom_badges_name: consumerBadge.wisdom_badges_name,
      knowledge_badges_count: consumerBadge.knowledge_badges_count,
      scheduled_badges_count: 0,//獲得予定のバッジ数については将来対応予定
      acquired_badges_count: 0,
      wisdom_badges_description: consumerBadge.wisdom_badges_description,
    }
    const targets = walletBadges.filter(v => v.badge_class_id == consumerBadge.digital_badge_class_id)
    if (targets.length != 0) {
      const walletBadge = targets[0]
      badgeData.acquired_badges_count = consumerBadge.knowledge_badges_count
    }
    badgeDatas.push(badgeData)
  }
  return badgeDatas
}

export function getCsvText(consumers: ConsumerGoal[], badgeDatas: PortfolioBadgeData[]): string {
  var text = ""
  for (const [i, v] of consumers.entries()) {
    text += `"${v.field1_name}",`
    text += "\r\n"
  }
  text += "\r\n"
  text += `"指標","能力バッジ名","取得可能","取得予定","獲得済み","能力バッジ概要"`
  text += "\r\n"
  for (const [i, v] of badgeDatas.entries()) {
    text += `"${v.consumer_name}",`
    text += `"${v.wisdom_badges_name}",`
    text += `"${v.knowledge_badges_count}",`
    text += `"${v.scheduled_badges_count}",`
    text += `"${v.acquired_badges_count}",`
    text += `"${v.wisdom_badges_description}",`
    text += "\r\n"
  }
  return text
}