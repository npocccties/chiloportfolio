import { PasswordResult } from "../data/PortfolioData"
import useSWR from 'swr'

export function usePassword (hashPass: string) {
  const apiPath = `/api/password?pass=${hashPass}`
  const url = `${apiPath}`
  console.log(url)
  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json() as Promise<PasswordResult | null>)
  }
  const { data, error, isLoading } = useSWR(`${url}`, fetcher)
  return {
    passwordResult: data,
    isLoadingPass: isLoading,
    isErrorPass: error
  }
}
