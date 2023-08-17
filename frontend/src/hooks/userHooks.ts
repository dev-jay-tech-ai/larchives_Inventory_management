import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import formClient from '../formClient'
import { User, UserInfo } from "../types/User"

export const useGetUsersQuery = () => 
  useQuery({
    queryKey: ['users'],
    queryFn: async () => (await apiClient.get<User[]>(`api/users`)).data,
  })

export const useGetUserQuery = (userId: string) => 
  useQuery({
    queryKey: ['user', userId],
    queryFn: async () => (await apiClient.get<User>(`api/users/user/${userId}`)).data,
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
      await apiClient.post<UserInfo>(`api/users/signin`,{
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
    await apiClient.post<UserInfo>(`api/users/signup`,{
      name, email, password
    })    
  ).data
  }) 

export const useAddUserMutation = () =>
  useMutation({
    mutationFn: async (formData : {
      name: string
      email: string
      file: File | null
    }) => (
      await formClient.post<UserInfo>(`api/users/adduser`,formData)   
    ).data
  }) 

  export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async (formData : {
      file: File | null
      name: string
      email: string
      password: string
    }) => (
        await formClient.put<UserInfo>(`api/users/profile`,formData)
      ).data
  })  