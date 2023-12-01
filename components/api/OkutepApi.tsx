import useSWRMutation from "swr/mutation"
import { ConsumerGoal, ConsumerBadge, PortalCategoryBadges } from "../../models/OkutepData"
import { ConsumerBadgesRequest } from "../../models/PortfolioData"
import useSWR from "swr"
import axios, { AxiosResponse } from "axios"
const baseUrl = process.env.NEXT_PUBLIC_OKUTEP_BASE_URL as string

export function useConsumerGoals () {
  const apiPath = `/api/v1/consumer/goal/list/`
  const url = `${baseUrl}${apiPath}`
  console.log(url)
  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json() as Promise<ConsumerGoal[] | null>)
  }
  const { data, error, isLoading } = useSWR(`${url}`, fetcher)
  return {
    consumerGoals: data,
    isLoadingConsumerGoals: isLoading,
    isErrorConsumerGoals: error,
  }
}

export function useConsumerGoalsWithTrigger () {
  const apiPath = `/api/v1/consumer/goal/list/`
  const url = `${baseUrl}${apiPath}`
  console.log(url)
  async function fetcher(url, { arg }: { arg: string }) {
    return await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: arg
      }
    }).then((res) => {
      return res.json() as Promise<ConsumerGoal[] | null>
    })
  }
  const { trigger, data, isMutating } = useSWRMutation(`${url}`, fetcher)
  return {
    triggerConsumerGoals: trigger,
    consumerGoalsEx: data,
    isMutatingConsumerGoals: isMutating
  }
}

export async function getConsumerGoalList(password: string): Promise<AxiosResponse<any, any>>{
  const apiPath = `/api/v1/consumer/goal/list/`
  const url = `${baseUrl}${apiPath}`
  return axios.get(url, {
    headers: {
      Authorization: password
    }
})
}

export function useConsumerBadgesWithTrigger () {
  const apiPath = `/api/v1/consumer/badges/list/`
  const url = `${baseUrl}${apiPath}`
  console.log(url)
  async function fetcher(url, { arg }: { arg: ConsumerBadgesRequest }) {
    const url2 = `${url}?framework_id=${arg.framework_id}&stage_id=${arg.stage_id}`
    console.log('url2:', url2)
    return await fetch(url2, {
      method: 'GET',
      headers: {
        Authorization: arg.password
      }
    }).then((res) => {
      return res.json() as Promise<ConsumerBadge[] | null>
    })
  }
  const { trigger, data, isMutating } = useSWRMutation(`${url}`, fetcher)
  return {
    triggerConsumerBadges: trigger,
    consumerBadgesEx: data,
    isMutatingConsumerBadges: isMutating
  }
}

export function usePortalCategoryBadgesWithTrigger () {
  const apiPath = `/api/v1/portalCategory/badges/list/`
  const url = `${baseUrl}${apiPath}`
  console.log(url)
  async function fetcher(url) {
    return await fetch(url).then((res) => {
      return res.json() as Promise<PortalCategoryBadges | null>
    })
  }
  const { trigger, data, isMutating } = useSWRMutation(`${url}`, fetcher)
  return {
    triggerPortalCategoryBadges: trigger,
    portalCategoryBadges: data,
    isMutatingPortalCategoryBadges: isMutating
  }
}
