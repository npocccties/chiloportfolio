import { ConsumerBadge, ConsumerGoal, WisdomBadge } from "@/models/OkutepData"
import { WalletBadge } from "@/models/WalletData"
import { PortfolioBadgeData } from "@/models/PortfolioData"
import { categoryColumnName } from "@/constants/e-portfolio"
import { createCipheriv, createDecipheriv } from "crypto"

export function toConsumerBadges(wisdomBadges: WisdomBadge[]): ConsumerBadge[] {
  var consumerBadges: ConsumerBadge[] = []
  for (const [i, wisdomBadge] of wisdomBadges.entries()) {
    var consumerBadge: ConsumerBadge = {
      consumer_id: 0,
      consumer_name: categoryColumnName,
      framework_id: 0,
      framework_name: '',
      stage_id: 0,
      stage_name: '',
      field1_name: wisdomBadge.portal_category_name,
      wisdom_badges_name: wisdomBadge.name,
      digital_badge_class_id: wisdomBadge.digital_badge_class_id,
      wisdom_badges_description: wisdomBadge.description,
      knowledge_badges_count: wisdomBadge.detail.knowledge_badges_list.length
    }
    consumerBadges.push(consumerBadge)
  }
  return consumerBadges
}

export function mergeBadgeDataWithConsumer(consumerBadges: ConsumerBadge[], walletBadges: WalletBadge[], allBadges: ConsumerBadge[]): PortfolioBadgeData[] {
  var badgeDatas: PortfolioBadgeData[] = []
  if (!consumerBadges || !walletBadges || consumerBadges.length == 0 || walletBadges.length == 0) {
    return badgeDatas
  }
  for (const [i, consumerBadge] of consumerBadges.entries()) {
    var badgeData: PortfolioBadgeData = {
      badge_class_id: consumerBadge.digital_badge_class_id,
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
    const targets = walletBadges.filter(v => v.badgeClassId == consumerBadge.digital_badge_class_id)
    if (targets.length != 0) {
      badgeData.acquired_badges_count = consumerBadge.knowledge_badges_count
    }
    badgeDatas.push(badgeData)
  }
  for (const [i, walletBadge] of walletBadges.entries()) {
    const targets = badgeDatas.filter(v => v.badge_class_id == walletBadge.badgeClassId)
      // プルダウン選択時のバッジにウォレットのバッジが含まれない場合
      if (targets.length == 0) {
      var knowledge_badges_count = 0
      var scheduled_badges_count = 0
      var acquired_badges_count = 0
      const target2 = allBadges.filter(v => v.digital_badge_class_id == walletBadge.badgeClassId)
      // ポータルのバッジにウォレットのバッジが含まれる場合
      if (target2.length != 0) {
        const badge = target2[0]
        knowledge_badges_count = badge.knowledge_badges_count
        scheduled_badges_count = 0
        acquired_badges_count = badge.knowledge_badges_count
      }
      var badgeData: PortfolioBadgeData = {
        badge_class_id: walletBadge.badgeClassId,
        consumer_id: 0,
        consumer_name: '',
        framework_name: '',
        framework_id: 0,
        stage_id: 0,
        stage_name: '',
        field1_name: '',
        wisdom_badges_name: walletBadge.badgeName,
        knowledge_badges_count: knowledge_badges_count,
        scheduled_badges_count: scheduled_badges_count,
        acquired_badges_count: acquired_badges_count,
        wisdom_badges_description: '',
      }
      badgeDatas.push(badgeData)
    }
  }
  return badgeDatas
}

export function getCsvText(columnName1: string, consumers: Array<string>, badgeDatas: PortfolioBadgeData[]): string {
  var text = ""
  for (const v of consumers) {
    text += `"${v}",`
    text += "\r\n"
  }
  text += "\r\n"
  text += `"${columnName1}","能力バッジ名","取得可能","取得済み","能力バッジ概要"`
  text += "\r\n"
  for (const [i, v] of badgeDatas.entries()) {
    text += `"${v.field1_name}",`
    text += `"${v.wisdom_badges_name}",`
    text += `"${v.knowledge_badges_count}",`
    text += `"${v.acquired_badges_count}",`
    text += `"${v.wisdom_badges_description}",`
    text += "\r\n"
  }
  return text
}

const algorithm = 'aes-256-cbc'
const inputEncoding = 'utf8'
const outputEncoding = 'hex'
const key = process.env.ENCRYPTION_KEY ?? ''
const iv = process.env.ENCRYPTION_IV ?? ''

export function encrypt(text: string): string {
  console.log(key, iv)
  const cipher = createCipheriv(algorithm, Buffer.from(key), Buffer.from(iv))
  let cipheredData = cipher.update(text, inputEncoding, outputEncoding)
  cipheredData += cipher.final(outputEncoding)
  return cipheredData
}

export function decrypt(encrypted: string): string {
  const decipher = createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv))
  let decipheredData = decipher.update(encrypted, outputEncoding, inputEncoding)
  decipheredData += decipher.final(inputEncoding)
  return decipheredData
}
