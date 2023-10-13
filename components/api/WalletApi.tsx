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
  var data = makeTestData1()
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
    badge_name: "学校安全と危機管理 (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=301",
  }
  data.push(work)
  work = {
    badge_name: "人権の尊重 (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=302",
  }
  data.push(work)
  work = {
    badge_name: "子どもの変化と教職について省察する (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=303",
  }
  data.push(work)
  work = {
    badge_name: "若手教員の育成 (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=304",
  }
  data.push(work)
  work = {
    badge_name: "特別支援教育の現状 (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=305",
  }
  data.push(work)
  work = {
    badge_name: "配慮を要する子ども・特別な援助ニーズのある子どもへの指導、支援 (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=306",
  }
  data.push(work)
  work = {
    badge_name: "子どもの心に耳をすます‐感情の社会化を促す関わり (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=307",
  }
  data.push(work)
  work = {
    badge_name: "組織的対応の必要性とチーム学校づくり (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=308",
  }
  data.push(work)
  work = {
    badge_name: "地域や保護者との連携 (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=309",
  }
  data.push(work)
  work = {
    badge_name: "体育授業と子供の健康 (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=310",
  }
  data.push(work)
  work = {
    badge_name: "安全の視点からの保健体育授業 (v1.0)",
    badge_class_id: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=311",
  }
  data.push(work)
  return data
}
