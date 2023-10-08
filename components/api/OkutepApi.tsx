import { ConsumerBadges } from "../data/OkutepData"
import useSWR from 'swr'
const baseUrl = process.env.NEXT_PUBLIC_OKUTEP_BASE_URL as string

export function useConsumerBadgesList () {
  const apiPath = '/api/v1/consumer/list/'//TODO:各大学に紐づいたバッジの一覧を返すAPIに差し替えること
  const url = `${baseUrl}${apiPath}`
  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json() as Promise<ConsumerBadges[] | null>)
  }
  //test
  //const { data, error, isLoading } = useSWR(`${url}`, fetcher)
  const error = false
  const isLoading = false
  var data: ConsumerBadges[]
  var data = makeTestData1("大阪市教育委員会")
  data = data.concat(makeTestData2("大阪府教育委員会"))
  data = data.concat(makeTestData3("堺市教育委員会"))
  //test
 
  return {
    consumerBadges: data,
    isLoading,
    isError: error
  }
}

function makeTestData1(cosumerName: string): ConsumerBadges[] {
  var data = []
  var work: ConsumerBadges = {
    consumer_name: cosumerName,
    field_name: "A 基本的資質",
    wisdom_badges_name: "学校安全と危機管理 (v1.0)",
    wisdom_badges_description: "学校における危機管理は重要な課題である。ここでは学校内外の安全確保や、情報セキュリティなどの近年の課題も踏まえて、学校における危機管理上の課題について論じる。",
    knowledge_badges_names: ["学校安全と学校危機 (v1.0)","学校における危機管理体制と危機時における対応 (v1.0)","危機時における心理的影響と再発防止 (v1.0)","防災教育 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "A 基本的資質",
    wisdom_badges_name: "人権の尊重 (v1.0)",
    wisdom_badges_description: "学校の課題を把握し、学校の人権教育推進のため、経験年数の少ない教職員に助言することができる（対象：経験年数5～10年程度の教職員）。",
    knowledge_badges_names: ["人権教育の指導方法等の在り方について① (v1.0)","人権教育の指導方法等の在り方について② (v1.0)","人権教育をとりまく諸情勢について (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "A 基本的資質",
    wisdom_badges_name: "子どもの変化と教職について省察する (v1.0)",
    wisdom_badges_description: "本講習では、国の教育政策の変化や法の改正について説明するとともに、チーム学校を作るため考え方の提示と学校をモデルとした演習を行います。各種答申に示された教育改革の方向性、2017年改訂学習指導要領の実現を支える実践的知見、「日本型学校教育」の海外展開について知ることで、教育現場の内部から教育活動を改善し教師が学び続けることの重要性を認識する。",
    knowledge_badges_names: ["めざす教師像 教師に求められる意識 (v1.0)","生活指導のあり方 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "A 基本的資質",
    wisdom_badges_name: "若手教員の育成 (v1.0)",
    wisdom_badges_description: "採用5年目までの若手教員を対象とします。 ・めざす教師像 ・教師に求められる意識 ・生活指導のあり方 を中心に、学び続ける教員をめざして、自己研鑽のあり方、協働意識のあり方を理解し、実践できることをめざします。",
    knowledge_badges_names: ["日本の教育政策動向 (v1.0)","教育実践の課題 (v1.0)","特別活動の可能性 (v1.0)","授業研究の可能性 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "B 子ども理解",
    wisdom_badges_name: "特別支援教育の現状 (v1.0)",
    wisdom_badges_description: "インクルーシブ教育システム構築をめぐる特別支援教育の現状を知り、また、どのような問題点があるかをについて学ぶ。その上で、障害に対する合理的配慮や学習指導要領に準拠した支援教育について理解することを目指す。",
    knowledge_badges_names: ["障害児教育における近年の変化 (v1.0)","障害のある児童生徒と育成すべき資質・能力 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "B 子ども理解",
    wisdom_badges_name: "特別支援教育の現状 (v1.0)",
    wisdom_badges_description: "インクルーシブ教育システム構築をめぐる特別支援教育の現状を知り、また、どのような問題点があるかをについて学ぶ。その上で、障害に対する合理的配慮や学習指導要領に準拠した支援教育について理解することを目指す。",
    knowledge_badges_names: ["日本における発達障害、LDの定義と実態 (v1.0)","LDのある児童生徒の学校における環境整備 (v1.0)","ADHDのある児童生徒の実態とその支援 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "B 子ども理解",
    wisdom_badges_name: "配慮を要する子ども・特別な援助ニーズのある子どもへの指導、支援 (v1.0)",
    wisdom_badges_description: "本研修では、通常の学級に在籍する発達障害のある児童生徒（可能性を含む）の実態と指導上の課題点について学ぶ。その上で、発達障害のある児童生徒への支援方法や環境整備について理解することを目的とする。",
    knowledge_badges_names: ["自己理解：科学的思考から振り返る (v1.0)","子ども理解：「ごまかし勉強」から知る (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "B 子ども理解",
    wisdom_badges_name: "子どもの心に耳をすます‐感情の社会化を促す関わり (v1.0)",
    wisdom_badges_description: "近年の不登校・いじめ・非行事例において、家庭や学校で、身近な大人に気持ちを送信できない子どもや、身近な大人から気持ちを受信してもらえない子どもが増えている。 本講義は、大人がどのように関われば子どもが気持ちを送信しやすくなり、また大人がどのように子どもの気持ちを受信すればよいのかについて、臨床事例および研究知見に基づき考察する。",
    knowledge_badges_names: ["日本における発達障害、LDの定義と実態 (v1.0)","LDのある児童生徒の学校における環境整備 (v1.0)","ADHDのある児童生徒の実態とその支援 (v1.0)"]
  }
  data.push(work)
  return data
}

function makeTestData2(cosumerName: string): ConsumerBadges[] {
  var data = []
  var work: ConsumerBadges = {
    consumer_name: cosumerName,
    field_name: "Ⅰ 教育への情熱と教員に求められる基礎的素養",
    wisdom_badges_name: "人権の尊重 (v1.0)",
    wisdom_badges_description: "学校の課題を把握し、学校の人権教育推進のため、経験年数の少ない教職員に助言することができる（対象：経験年数5～10年程度の教職員）。",
    knowledge_badges_names: ["人権教育の指導方法等の在り方について① (v1.0)","人権教育の指導方法等の在り方について② (v1.0)","人権教育をとりまく諸情勢について (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "Ⅰ 教育への情熱と教員に求められる基礎的素養",
    wisdom_badges_name: "学校安全と危機管理 (v1.0)",
    wisdom_badges_description: "学校における危機管理は重要な課題である。ここでは学校内外の安全確保や、情報セキュリティなどの近年の課題も踏まえて、学校における危機管理上の課題について論じる。",
    knowledge_badges_names: ["学校安全と学校危機 (v1.0)","学校における危機管理体制と危機時における対応 (v1.0)","危機時における心理的影響と再発防止 (v1.0)","防災教育 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "Ⅰ 教育への情熱と教員に求められる基礎的素養",
    wisdom_badges_name: "子どもの変化と教職について省察する (v1.0)",
    wisdom_badges_description: "本講習では、国の教育政策の変化や法の改正について説明するとともに、チーム学校を作るため考え方の提示と学校をモデルとした演習を行います。各種答申に示された教育改革の方向性、2017年改訂学習指導要領の実現を支える実践的知見、「日本型学校教育」の海外展開について知ることで、教育現場の内部から教育活動を改善し教師が学び続けることの重要性を認識する。",
    knowledge_badges_names: ["日本の教育政策動向 (v1.0)","教育実践の課題 (v1.0)","特別活動の可能性 (v1.0)","授業研究の可能性 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "Ⅲ 学校組織の一員としての行動力や企画力、調整力",
    wisdom_badges_name: "組織的対応の必要性とチーム学校づくり (v1.0)",
    wisdom_badges_description: "学校において、近年ますます多様化・複雑化する課題に対応するために、組織的対応が求められています。本講習では、学校に求められる役割や機能が変化について説明するとともに、チーム学校をつくるため視点の提示と学校をモデルとした演習を行います。",
    knowledge_badges_names: ["多様化・複雑化する課題と学校の変化 (v1.0)","組織的対応の必要性 (v1.0)","「チーム学校」づくりを考える (v1.0)","ワーク:学校のジレンマ (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "Ⅲ 学校組織の一員としての行動力や企画力、調整力",
    wisdom_badges_name: "地域や保護者との連携 (v1.0)",
    wisdom_badges_description: "どのような経緯を経て、「開かれた学校」づくりが推進されたのか、更に「社会とともにある学校」づくりの必要性が生じたのか、その経緯とともに、背景をしっかりと理解し、今今の教育に生かそうとする資質を高める。",
    knowledge_badges_names: ["家庭の役割の見直しと地域の力を生かす取組 (v1.0)","生きる力の育成と開かれた学校づくり (v1.0)","開かれた学校づくりの成果と課題 (v1.0)","子どもをめぐる実態とこれからの教育 (v1.0)","地域、社会とともにある学校づくり (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "Ⅲ 学校組織の一員としての行動力や企画力、調整力",
    wisdom_badges_name: "若手教員の育成 (v1.0)",
    wisdom_badges_description: "採用5年目までの若手教員を対象とします。 ・めざす教師像 ・教師に求められる意識 ・生活指導のあり方 を中心に、学び続ける教員をめざして、自己研鑽のあり方、協働意識のあり方を理解し、実践できることをめざします。",
    knowledge_badges_names: ["めざす教師像 教師に求められる意識 (v1.0)","生活指導のあり方 (v1.0)"]
  }
  data.push(work)
  return data
}

function makeTestData3(cosumerName: string): ConsumerBadges[] {
  var data = []
  var work: ConsumerBadges = {
    consumer_name: cosumerName,
    field_name: "教員としての資質",
    wisdom_badges_name: "人権の尊重 (v1.0)",
    wisdom_badges_description: "学校の課題を把握し、学校の人権教育推進のため、経験年数の少ない教職員に助言することができる（対象：経験年数5～10年程度の教職員）。",
    knowledge_badges_names: ["人権教育の指導方法等の在り方について① (v1.0)","人権教育の指導方法等の在り方について② (v1.0)","人権教育をとりまく諸情勢について (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "教員としての資質",
    wisdom_badges_name: "若手教員の育成 (v1.0)",
    wisdom_badges_description: "採用5年目までの若手教員を対象とします。 ・めざす教師像 ・教師に求められる意識 ・生活指導のあり方 を中心に、学び続ける教員をめざして、自己研鑽のあり方、協働意識のあり方を理解し、実践できることをめざします。",
    knowledge_badges_names: ["めざす教師像 教師に求められる意識 (v1.0)","生活指導のあり方 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "教員としての資質",
    wisdom_badges_name: "子どもの変化と教職について省察する (v1.0)",
    wisdom_badges_description: "本講習では、国の教育政策の変化や法の改正について説明するとともに、チーム学校を作るため考え方の提示と学校をモデルとした演習を行います。各種答申に示された教育改革の方向性、2017年改訂学習指導要領の実現を支える実践的知見、「日本型学校教育」の海外展開について知ることで、教育現場の内部から教育活動を改善し教師が学び続けることの重要性を認識する。",
    knowledge_badges_names: ["日本の教育政策動向 (v1.0)","教育実践の課題 (v1.0)","特別活動の可能性 (v1.0)","授業研究の可能性 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "実践力",
    wisdom_badges_name: "体育授業と子供の健康 (v1.0)",
    wisdom_badges_description: "健康・スポーツに関する課題と成果は日々更新されており、最新の情報で教育を行うことが必要であるものの、現場教員にとっては困難がある。本講習では、体育科・保健体育科の指導に関連する「教科内容」を、健康の観点から解説を通して、教科専門指導能力の向上を図る。",
    knowledge_badges_names: ["現代の子供の体力 (v1.0)","子供の運動時に多い疾患とケガ (v1.0)","体育と熱中症 (v1.0)","COVID-19の影響と保健体育 (v1.0)"]
  }
  data.push(work)
  work = {
    consumer_name: cosumerName,
    field_name: "実践力",
    wisdom_badges_name: "安全の視点からの保健体育授業 (v1.0)",
    wisdom_badges_description: "本講習では、体育科・保健体育科の指導を、安全の観点から考え、実践に活用できるようになることを目的とする。そのために近年の子供の運動指導、各種体育授業における安全についての解説、教科専門指導能力の向上を図る。",
    knowledge_badges_names: ["学習指導要領と体育の見方・考え方 (v1.0)","子供の特徴と運動指導のあり方について解説する。","体育における安全管理 −水泳− (v1.0)","体育における安全管理 −武道・剣道− (v1.0)","体育における安全管理 −柔道− (v1.0)"]
  }
  data.push(work)
  return data
}