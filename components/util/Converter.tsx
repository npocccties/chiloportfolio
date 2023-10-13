import { ConsumerBadges } from "@/components/data/OkutepData"
import { WalletBadge } from "@/components/data/WalletData"
import { PortfolioBadgeData } from "@/components/data/PortfolioData"

export function mergeBadgeData(consumerBadges: ConsumerBadges[], walletBadges: WalletBadge[]): PortfolioBadgeData[] {
  var badgeDatas: PortfolioBadgeData[] = []
  if (!consumerBadges || !walletBadges) {
    return badgeDatas
  }
  for (const [i, consumerBadge] of consumerBadges.entries()) {
    var badgeData: PortfolioBadgeData = {
      consumer_name: consumerBadge.consumer_name,
      framework_name: consumerBadge.framework_name,
      stage_invisible: consumerBadge.stage_invisible,
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

export function getCsvText(badgeDatas: PortfolioBadgeData[]): string {
  var text = `"指標","能力バッジ名","取得可能","取得予定","獲得済み","能力バッジ概要"`
  text += "\r\n"
  for (const [i, badgeData] of badgeDatas.entries()) {
    text += `"${badgeData.consumer_name}",`
    text += `"${badgeData.wisdom_badges_name}",`
    text += `"${badgeData.knowledge_badges_count}",`
    text += `"${badgeData.scheduled_badges_count}",`
    text += `"${badgeData.acquired_badges_count}",`
    text += `"${badgeData.wisdom_badges_description}",`
    text += "\r\n"
  }
  return text
}