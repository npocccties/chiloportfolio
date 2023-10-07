import { BadgeData } from "@/components/data/PortfolioData";

export function getCsvText(badgeDatas: BadgeData[]): string {
  var text = ""
  for (const [i, badgeData] of badgeDatas.entries()) {
    text += `"${badgeData.consumer_name}",`
    text += `"${badgeData.wisdome_badges_name}",`
    text += `"${badgeData.knowledge_badges_count}",`
    text += `"${badgeData.scheduled_badges_count}",`
    text += `"${badgeData.acquired_badges_count}",`
    text += `"${badgeData.wisdome_badges_description}",`
  }
  return text
}