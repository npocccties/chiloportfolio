import axios from "axios"
import { WalletBadge } from "../../models/WalletData"
import useSWR from 'swr'

const baseUrl = process.env.NEXT_PUBLIC_WALLET_BASE_URL as string

export async function getWalletBadgeList (): Promise<WalletBadge[] | null> {
  const apiPath = '/api/v1/user_badgelist'
  const url = `${baseUrl}${apiPath}`
  try {
    await axios({
      withCredentials: true, 
      method: 'GET',
      url: url,
    }).then((response) => {
      console.log(response.data);
      return response.data as WalletBadge[]
    }).catch(error => console.log(error));
  } catch (ex: any) {
    console.error("ex", ex);
    throw new Error()
  }
  return null
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
