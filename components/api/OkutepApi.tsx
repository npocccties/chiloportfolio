import { ConsumerBadges } from "../data/OkutepData"
import useSWR from 'swr'
const baseUrl = process.env.NEXT_PUBLIC_OKUTEP_BASE_URL as string

export function useConsumerBadgesList (invisible: boolean) {
  const apiPath = `/api/v1/consumer/badges/list/?invisible=${invisible}`
  const url = `${baseUrl}${apiPath}`
  console.log(url)
  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json() as Promise<ConsumerBadges[] | null>)
  }
  const { data, error, isLoading } = useSWR(`${url}`, fetcher)
  return {
    consumerBadges: data,
    isLoading,
    isError: error
  }
}
