import { WalletBadge } from "../../models/WalletData"
import useSWR from 'swr'
const baseUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string

export function useWalletBadgeList () {
  const apiPath = '/api/v1/user_badgelist'
  const url = `${baseUrl}${apiPath}`
  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json() as Promise<WalletBadge[] | null>)
  }
  const { data, error, isLoading } = useSWR(`${url}`, fetcher)

  //test
  // const error = false
  // const isLoading = false
  // var data = makeTestData1()
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
    badgeName: "学校の危機管理と課題",
    badgeClassId: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=158",
  }
  data.push(work)
  work = {
    badgeName: "子どもの変化と教職について省察する",
    badgeClassId: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=151",
  }
  data.push(work)
  work = {
    badgeName: "子どもの心に耳をすます‐感情の社会化を促す関わり",
    badgeClassId: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=156",
  }
  data.push(work)
  work = {
    badgeName: "子ども理解の教育心理学",
    badgeClassId: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=169",
  }
  data.push(work)
  work = {
    badgeName: "学校の危機管理と課題",
    badgeClassId: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=158",
  }
  data.push(work)
  work = {
    badgeName: "GIGAスクール時代におけるICT活用入門　〜授業実践から校務活用まで〜",
    badgeClassId: "https://lms.okutep.osaka-kyoiku.ac.jp/badges/badge_json.php?id=147",
  }
  data.push(work)
  return data
}
