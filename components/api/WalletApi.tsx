import { WalletBadge } from "../../models/WalletData"
import useSWR from 'swr'
const baseUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string

export function useWalletBadgeList () {
  //test
  // const apiPath = '/api/v1/user_badgelist/'
  // const url = `${baseUrl}${apiPath}`
  // async function fetcher(key: string, init?: RequestInit) {
  //   return fetch(key, init).then((res) => res.json() as Promise<WalletBadge[] | null>)
  // }
  // const { data, error, isLoading } = useSWR(`${url}`, fetcher)

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
  var data:WalletBadge[] = []
  var work: WalletBadge = {
    badge_name: "学校の危機管理と課題",
    badge_class: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=158",
  }
  data.push(work)
  work = {
    badge_name: "子どもの変化と教職について省察する",
    badge_class: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=151",
  }
  data.push(work)
  work = {
    badge_name: "子どもの心に耳をすます‐感情の社会化を促す関わり",
    badge_class: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=156",
  }
  data.push(work)
  work = {
    badge_name: "子ども理解の教育心理学",
    badge_class: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=169",
  }
  data.push(work)
  work = {
    badge_name: "学校の危機管理と課題",
    badge_class: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=158",
  }
  data.push(work)
  work = {
    badge_name: "GIGAスクール時代におけるICT活用入門　〜授業実践から校務活用まで〜",
    badge_class: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=147",
  }
  data.push(work)
  return data
}
