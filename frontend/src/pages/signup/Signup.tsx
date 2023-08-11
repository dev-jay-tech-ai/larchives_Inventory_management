import { useContext, useEffect, useState } from 'react'
import { Store } from '../../Store'
import { useLocation,  useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../../hooks/userHooks'
import { toast } from 'react-toastify'
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'

const Signup = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl =  new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl :  '/'
  
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const { state, dispatch }  = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if(userInfo) navigate(redirect) 
  },[ navigate, redirect, userInfo ])

  const { mutateAysnc: signup, isLoading } = useSignupMutation()
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      toast.error('Passwords do not match with ')
      return
    }
    try {
      const data = await signup({
        name, email, password
      })
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    } catch(error) {
      toast.error(getError(error as ApiError))
    }
  }

  return (
    <div>Sign up</div>
  )

}

export default Signup