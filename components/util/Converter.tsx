import { ConsumerBadges } from "@/components/data/OkutepData"
import { WalletBadge } from "@/components/data/WalletData"
import { PortfolioBadgeData } from "@/components/data/PortfolioData"

export function mergeBadgeData(consumerBadges: ConsumerBadges[], walletBadges: WalletBadge[]): PortfolioBadgeData[] {
  var badgeDatas: PortfolioBadgeData[] = []
  for (const [i, consumerBadge] of consumerBadges.entries()) {
    const targets = walletBadges.filter(v => v.wisdom_badge_name == consumerBadge.wisdom_badges_name)
    if (targets.length == 0) {
      continue
    }
    const walletBadge = targets[0]
    const badgeData: PortfolioBadgeData = {
      consumer_name: consumerBadge.consumer_name,
      field_name: consumerBadge.field_name,
      wisdom_badges_name: consumerBadge.wisdom_badges_name,
      scheduled_badges_count: consumerBadge.knowledge_badges_names.length - walletBadge.knowledge_badge_names.length,
      acquired_badges_count: walletBadge.knowledge_badge_names.length,
      knowledge_badges_count: consumerBadge.knowledge_badges_names.length,
      wisdom_badges_description: consumerBadge.wisdom_badges_description,
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