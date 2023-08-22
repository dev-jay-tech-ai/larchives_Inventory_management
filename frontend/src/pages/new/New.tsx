import { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./new.scss"
import { useAddUserMutation } from "../../hooks/userHooks"
import { ApiError } from "../../types/ApiError"
import { getError } from "../../utils"
import { toast } from "react-toastify"
import { Store } from '../../Store'
import { useLocation, useNavigate } from "react-router-dom";

type NewUserInput = {
  id: number;
  label: string;
  type: string;
  placeholder?: string;
}

interface NewUser {
  inputs: NewUserInput[],
  title: string
}

const New:React.FC<NewUser> = ({ inputs, title }) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl =  new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl :  '/'

  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const { state, dispatch }  = useContext(Store)
  // const { UserInfo } = state

  const { mutateAsync: adduser } = useAddUserMutation()
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if(email === '' || name === '') {
      toast.error('name and email are required ')
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      file && formData.append('file', file)
      const data = await adduser(formData)
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    } catch(error) {
      toast.error(getError(error as ApiError))
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {/*<div className="top">
           <h1>{title}</h1> 
        </div>*/}
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=''
            />
          </div>
          <div className="right">
            <form encType='multipart/form-data'>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name='file'
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if(selectedFile) {
                      const maxSize = 5 * 1024 * 1024
                      if(selectedFile.size > maxSize) alert('Image is too large')
                      else setFile(selectedFile)
                    } 
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput"></div>
              {inputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    name={input.label === 'Email*' ? 'email': 'name'}
                    type={input.type} 
                    placeholder={input.placeholder} 
                    onChange={(e) => {
                      if(input.label === 'Email*') setEmail(e.target.value) 
                      else if(input.label === 'Name and surname*') setName(e.target.value)
                    }}
                  />
                </div>
              ))}
              <button onClick={submitHandler}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New