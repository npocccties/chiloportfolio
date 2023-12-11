import useSWRMutation from "swr/mutation"
import { PortalCategoryBadges } from "../../models/OkutepData"
import axios, { AxiosResponse } from "axios"
const baseUrl = process.env.NEXT_PUBLIC_OKUTEP_BASE_URL as string

export async function getConsumerGoalList(password: string): Promise<AxiosResponse<any, any>>{
  const apiPath = `/api/v1/consumer/goal/list/`
  const url = `${baseUrl}${apiPath}`
  console.log(url, password)
  return axios.get(url, {
    headers: {
      Authorization: password
    }
  })
}

export async function getConsumerBadgeList(password: string, frameworkId: number, stageId: number): Promise<AxiosResponse<any, any>>{
  const apiPath = `/api/v1/consumer/badges/list/`
  const url = `${baseUrl}${apiPath}`
  const url2 = `${url}?framework_id=${frameworkId}&stage_id=${stageId}`
  console.log(url2, password)
  return axios.get(url2, {
    headers: {
      Authorization: password
    }
  })
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
