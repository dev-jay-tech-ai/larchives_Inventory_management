import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { User, UserInfo } from "../types/User"

export const useGetUsersQuery = () => 
  useQuery({
    queryKey: ['users'],
    queryFn: async () => (await apiClient.get<User[]>(`api/user`)).data,
  })

export const  useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password
    } : {
      email: string
      password: string
    }) => (
      await apiClient.post<UserInfo>(`api/user/signin`,{
        email, password
      })    
    ).data
  })

  export const  useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password
    } : {
      name: string
      email: string
      password: string
    }) => (
      await apiClient.post<UserInfo>(`api/user/signup`,{
        name, email, password
      })    
    ).data
  }) 