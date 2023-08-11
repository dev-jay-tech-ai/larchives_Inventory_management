import { useMutation } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { UserInfo } from "../types/User"

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