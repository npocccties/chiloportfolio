import { WalletBadge } from "../data/WalletData"
import useSWR from 'swr'
const baseUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string

export function useWalletBadgeList () {
  const apiPath = '/api/v1/user_badgelist/'
  const url = `${baseUrl}${apiPath}`
  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json() as Promise<WalletBadge[] | null>)
  }
  //test
  //const { data, error, isLoading } = useSWR(`${url}`, fetcher)
  const error = false
  const isLoading = false
  var data: WalletBadge[]
  var data = makeTestData1()
  data = data.concat(makeTestData2())
  data = data.concat(makeTestData3())
  //test
 
  return {
    walletBadges: data,
    isLoadingWB: isLoading,
    isErrorWB: error
  }
}

function makeTestData1(): WalletBadge[] {
  var data = []
  var work: WalletBadge = {
    wisdom_badge_name: "学校安全と危機管理 (v1.0)",
    knowledge_badge_names: ["学校安全と学校危機 (v1.0)","学校における危機管理体制と危機時における対応 (v1.0)","危機時における心理的影響と再発防止 (v1.0)","防災教育 (v1.0)"],
  }
  data.push(work)
  work = {
    wisdom_badge_name: "人権の尊重 (v1.0)",
    knowledge_badge_names: ["人権教育の指導方法等の在り方について① (v1.0)","人権教育の指導方法等の在り方について② (v1.0)","人権教育をとりまく諸情勢について (v1.0)","子どもの変化と教職について省察する (v1.0)"],
  }
  data.push(work)
  work = {
    wisdom_badge_name: "子どもの変化と教職について省察する (v1.0)",
    knowledge_badge_names: ["めざす教師像 教師に求められる意識 (v1.0)","生活指導のあり方 (v1.0)"],
  }
  data.push(work)
  work = {
    wisdom_badge_name: "特別支援教育の現状 (v1.0)",
    knowledge_badge_names: ["日本の教育政策動向 (v1.0)","教育実践の課題 (v1.0)","特別活動の可能性 (v1.0)","授業研究の可能性 (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "特別支援教育の現状 (v1.0)",
    knowledge_badge_names: ["日本における発達障害、LDの定義と実態 (v1.0)","LDのある児童生徒の学校における環境整備 (v1.0)","ADHDのある児童生徒の実態とその支援 (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "配慮を要する子ども・特別な援助ニーズのある子どもへの指導、支援 (v1.0)",
    knowledge_badge_names: ["自己理解：科学的思考から振り返る (v1.0)","子ども理解：「ごまかし勉強」から知る (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "配慮を要する子ども・特別な援助ニーズのある子どもへの指導、支援 (v1.0)",
    knowledge_badge_names: ["自己理解：科学的思考から振り返る (v1.0)","子ども理解：「ごまかし勉強」から知る (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "子どもの心に耳をすます‐感情の社会化を促す関わり (v1.0)",
    knowledge_badge_names: ["日本における発達障害、LDの定義と実態 (v1.0)","LDのある児童生徒の学校における環境整備 (v1.0)","ADHDのある児童生徒の実態とその支援 (v1.0)"]
  }
  data.push(work)
  return data
}
function makeTestData2(): WalletBadge[] {
  var data = []
  var work: WalletBadge = {
    wisdom_badge_name: "人権の尊重 (v1.0)",
    knowledge_badge_names: ["人権教育の指導方法等の在り方について① (v1.0)","人権教育の指導方法等の在り方について② (v1.0)","人権教育をとりまく諸情勢について (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "学校安全と危機管理 (v1.0)",
    knowledge_badge_names: ["学校安全と学校危機 (v1.0)","学校における危機管理体制と危機時における対応 (v1.0)","危機時における心理的影響と再発防止 (v1.0)","防災教育 (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "子どもの変化と教職について省察する (v1.0)",
    knowledge_badge_names: ["日本の教育政策動向 (v1.0)","教育実践の課題 (v1.0)","特別活動の可能性 (v1.0)","授業研究の可能性 (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "組織的対応の必要性とチーム学校づくり (v1.0)",
    knowledge_badge_names: ["多様化・複雑化する課題と学校の変化 (v1.0)","組織的対応の必要性 (v1.0)","「チーム学校」づくりを考える (v1.0)","ワーク:学校のジレンマ (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "地域や保護者との連携 (v1.0)",
    knowledge_badge_names: ["家庭の役割の見直しと地域の力を生かす取組 (v1.0)","生きる力の育成と開かれた学校づくり (v1.0)","開かれた学校づくりの成果と課題 (v1.0)","子どもをめぐる実態とこれからの教育 (v1.0)","地域、社会とともにある学校づくり (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "若手教員の育成 (v1.0)",
    knowledge_badge_names: ["めざす教師像 教師に求められる意識 (v1.0)","生活指導のあり方 (v1.0)"]
  }
  data.push(work)
  return data
}

function makeTestData3(): WalletBadge[] {
  var data = []
  var work: WalletBadge = {
    wisdom_badge_name: "人権の尊重 (v1.0)",
    knowledge_badge_names: ["人権教育の指導方法等の在り方について① (v1.0)","人権教育の指導方法等の在り方について② (v1.0)","人権教育をとりまく諸情勢について (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "若手教員の育成 (v1.0)",
    knowledge_badge_names: ["めざす教師像 教師に求められる意識 (v1.0)","生活指導のあり方 (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "子どもの変化と教職について省察する (v1.0)",
    knowledge_badge_names: ["日本の教育政策動向 (v1.0)","教育実践の課題 (v1.0)","特別活動の可能性 (v1.0)","授業研究の可能性 (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "特別支援教育の現状 (v1.0)",
    knowledge_badge_names: ["日本の教育政策動向 (v1.0)","教育実践の課題 (v1.0)","特別活動の可能性 (v1.0)","授業研究の可能性 (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "体育授業と子供の健康 (v1.0)",
    knowledge_badge_names: ["現代の子供の体力 (v1.0)","子供の運動時に多い疾患とケガ (v1.0)","体育と熱中症 (v1.0)","COVID-19の影響と保健体育 (v1.0)"]
  }
  data.push(work)
  work = {
    wisdom_badge_name: "安全の視点からの保健体育授業 (v1.0)",
    knowledge_badge_names: ["学習指導要領と体育の見方・考え方 (v1.0)","子供の特徴と運動指導のあり方について解説する。","体育における安全管理 −水泳− (v1.0)","体育における安全管理 −武道・剣道− (v1.0)","体育における安全管理 −柔道− (v1.0)"]
  }
  data.push(work)
  return data
}
