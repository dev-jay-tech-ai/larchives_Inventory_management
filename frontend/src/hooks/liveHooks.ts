import { useMutation, useQuery } from "@tanstack/react-query"
import { Sheet, SheetData } from "../types/Sheet"
import apiClient from "../apiClient"

export const useSheetMutation = () => 
  useMutation({
    mutationFn: async ({ data }: { data: SheetData[] }) => (
      await apiClient.post<SheetData[]>(`api/sheet`, { data })).data
  })  

export const useSheetQuery = (slug: string) => 
  useQuery({
    queryKey: ['stock', slug],
    queryFn: async () => (await apiClient.get<Sheet[]>(`api/sheet/stock/${slug}`)).data,
  })