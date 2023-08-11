import { useQuery } from "@tanstack/react-query"
import { Shopify } from "../types/Shopify"
import apiClient from "../apiClient"

export const useStockQuery = () => 
  useQuery({
    queryKey: ['stock'],
    queryFn: async () => (await apiClient.get<Shopify[]>(`api/stock/shopify`)).data,
  })