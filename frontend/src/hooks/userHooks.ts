import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { User, UserInfo } from "../types/User"

export const useGetUsersQuery = () => 
  useQuery({
    queryKey: ['users'],
    queryFn: async () => (await apiClient.get<User[]>(`api/user`)).data,
  })

export const useGetUserQuery = (userId: string) => 
  useQuery({
    queryKey: ['user', userId],
    queryFn: async () => (await apiClient.get<User>(`api/user/${userId}`)).data,
  })  

export const useSigninMutation = () =>
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

export const useAddUserMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      file
    } : {
      name: string
      email: string
      file: string | undefined
    }) => (
      await apiClient.post<UserInfo>(`api/user/adduser`,{
        name, email, file
      })    
    ).data
  }) 