import { PasswordResult } from "../data/PortfolioData"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export function usePassword () {
  const apiPath = `/api/password`
  const url = `${apiPath}`
  console.log(url)

  async function fetcher(url, { arg }: { arg: string }) {
    return await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: arg
      }
    }).then((res) => res.json() as Promise<PasswordResult | null>)
  }    
  const { trigger, data, isMutating } = useSWRMutation(`${url}`, fetcher)
  return {
    trigger,
    passwordResult: data,
    isMutating
  }
}
