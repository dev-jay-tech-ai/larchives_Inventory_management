import { useMutation, useQuery, MutationFunction } from '@tanstack/react-query'
import { Product, ProductObj } from '../types/Product'
import { InventoryUpdateAPIResponse } from '../types/Shopify'
import apiClient from '../apiClient'

export const useGetProductsQuery = () => 
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<Product[]>(`api/product`)).data,
  })

export const useUpdateProductMutation = () => {
  const mutationFn: MutationFunction<InventoryUpdateAPIResponse,{ inventoryItemId: number, qty: number }> = async (data) => {
    const response = await apiClient.post('api/product/update', {
      data,
    })
    return response.data;
  }
  return useMutation(mutationFn);
}

export const useUpdateProductsMutation = () => 
  useMutation({
    mutationFn: async (products: ProductObj[]) =>
      (await apiClient.post('api/product/update/bulk', {
        data: products, // Pass the productIds as data in the request body
      })).data,
  })

export const useDeleteProductMutation = () => // Update the return type to MutationFunction
  useMutation({
    mutationFn: async (productId: number) => (await apiClient.delete(`api/product/delete/${productId}`))
  })

export const useDeleteProductsMutation = () =>
  useMutation({
    mutationFn: async (productIds: number[]) =>
      (await apiClient.delete('api/product/delete', {
        data: productIds, // Pass the productIds as data in the request body
      })).data,
  })

export const useShopifyInventoryMutation = () => 
  useMutation(
    async () => {
      await apiClient.get('/api/db/insert/shopify/inventory');
    },
    {
      onError: (error) => {
        console.error('Error updating inventory:', error);
      },
      onSuccess: () => {
        console.log('Inventory updated successfully');
      },
    }
  )
