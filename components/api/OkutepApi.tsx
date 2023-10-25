import { ConsumerBadges, PortalCategory, PortalCategoryBadges } from "../data/OkutepData"
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

export function usePortalCategoryList () {
  const apiPath = `/api/v1/portalCategory/list/`
  const url = `${baseUrl}${apiPath}`
  console.log(url)
  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json() as Promise<PortalCategory[] | null>)
  }
  const { data, error, isLoading } = useSWR(`${url}`, fetcher)
  return {
    portalCategories: data,
    isLoadingPCL: isLoading,
    isErrorPCL: error
  }
}

export function usePortalCategoryBadges (portalCategoryId: number) {
  const apiPath = `/api/v1/portalCategory/badges/list/?portal_category_id=${portalCategoryId}`
  const url = `${baseUrl}${apiPath}`
  console.log(url)
  async function fetcher(key: string, init?: RequestInit) {
    return fetch(key, init).then((res) => res.json() as Promise<PortalCategoryBadges | null>)
  }
  const { data, error, isLoading } = useSWR(`${url}`, fetcher)
  return {
    portalCategoryBadges: data,
    isLoadingPCBL: isLoading,
    isErrorPCBL: error
  }
}
