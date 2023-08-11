import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Form } from 'react-bootstrap'
import { Store } from '../../Store'
import { useSigninMutation } from "../../hooks/userHooks"
import { toast } from "react-toastify"
import { getError } from "../../utils"
import { ApiError } from "../../types/ApiError"
import { Container } from "react-bootstrap"
import './signin.scss'
import LoadingBox from "../../components/LoadingBox"
import logo from '../../assets/logo.svg'

const Signin = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect') // get the value of redirect from url
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { state, dispatch } = useContext(Store)
  const  { userInfo } = state

  const { mutateAsync: signin, isLoading } = useSigninMutation()
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
        const data = await signin({ email, password })
        dispatch({ type: 'USER_SIGNIN', payload: data }) // save the backend data on React
        localStorage.setItem('userInfo', JSON.stringify(data))// save the backend data in the localstroage
        navigate(redirect)
      } catch (err) {
        toast.error(getError(err as ApiError))
      }
  }

  useEffect(() => { // if user already has userInfo, doensn't need to
    if (userInfo) navigate(redirect) // send signin page
  },[ navigate, userInfo, redirect ]) // 사용하는 모든 값을 넣어준다

  return (
    <Container className='small-container'>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none", textAlign: 'center' }}>
          <img src={logo} alt="Logo" className="logo" style={{ width: '100%', verticalAlign: 'middle' }} />
        </Link>
      </div>
      <title>Sign In</title>
      <h2 className='my-3'>Sign In</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className='mb-3'>
          <Button disabled={isLoading} type='submit'>Sign In</Button>
          { isLoading && <LoadingBox /> }  
        </div>
        <div className='mb-3'>
          New Customer?{' '} 
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  )
}

export default Signin