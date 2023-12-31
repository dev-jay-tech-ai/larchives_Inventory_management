import './profile.scss'
import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Store } from '../../Store'
import { toast } from 'react-toastify'
import { ApiError } from "../../types/ApiError"
import { getError } from "../../utils"
import LoadingBox from '../../components/loading/LoadingBox'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useUpdateProfileMutation } from '../../hooks/userHooks'

const Profile = () => {
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const [file, setFile] = useState(userInfo!.file)
  const [name, setName] = useState(userInfo!.name)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const email = userInfo!.email
  const givenname = name.split(' ')[0]

  const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      file && formData.append('file', file)
      const data = await updateProfile(formData)
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      toast.success('User updated successfully')
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  return (
    <div className='profile'>
      <Sidebar />
      <div className='profileContainer'>
        <Navbar />
        <div className="container small-container">
          <div className='top'>
            <title>User Profile</title>
          </div>
          <h1 className="my-3">{givenname}'s Profile</h1>
          <form encType='multipart/form-data' onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="file">
              <Form.Label>File</Form.Label>
              <Form.Control
                type='file'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const selectedFile = e.target.files?.[0]
                  if(selectedFile) {
                    const maxSize = 5 * 1024 * 1024
                    if(selectedFile.size > maxSize) alert('Image is too large')
                    else setFile(selectedFile)
                  } 
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <div className="mb-3">
              <Button disabled={isLoading} type="submit">
                Update
              </Button>
              {isLoading && <LoadingBox></LoadingBox>}
            </div>
          </form>
        </div>
      </div>
    </div>  
  )
}

export default Profile