import "./single.scss";
import { useParams } from 'react-router-dom'
import { useGetUserQuery } from "../../hooks/userHooks"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import LoadingBox from "../../components/loading/LoadingBox"
import { MessageBox } from "../../components/MessageBox"
import { ApiError } from "../../types/ApiError"
import { getError } from "../../utils"
import { useState } from "react";
import { User } from "../../types/User";
import { Button } from "react-bootstrap";
import dotenv from 'dotenv'

dotenv.config()

const Single:React.FC = () => {
  const { userId } = useParams()
  const { data: user, isLoading, error } = useGetUserQuery(userId!)
  const [ isEditMode, setIsEditMode ] = useState(false)
  const [ editedUser, setEditedUser ] = useState<User | undefined>(user)

  const editHandler = () => {
    setIsEditMode(!isEditMode)
  }

  const saveHandler = () => {
    setIsEditMode(false)
  }

  return (
    isLoading ? <LoadingBox /> :
    error ? <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox> :
    !user ? <MessageBox variant='danger'>User Not Found</MessageBox> :
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={editHandler}>Edit</div>
            <h1 className="title">Information</h1> 
            <div className="item">
              <img
                src={editedUser?.file ? process.env.REACT_APP_IMAGE_BASE_URL + editedUser.file : 
                  user?.file ? process.env.REACT_APP_IMAGE_BASE_URL + user.file : 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'}
                alt=''
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">
                  {isEditMode ? 
                    <input 
                      type='text' 
                      value={editedUser?.name} 
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} /> :
                  user?.name}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">
                    {isEditMode ? 
                      <input 
                        type='text' 
                        value={editedUser?.email} 
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} /> :
                    user?.email}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">permission:</span>
                  <span className="itemValue">
                    {isEditMode?
                      <select name='permission'>
                        <option value='admin'>{ editedUser?.isAdmin ? 'Admin' : 'Stuff' }</option>
                        <option value='stuff'>{ editedUser?.isAdmin ? 'Stuff' : 'Admin' }</option>
                      </select> :
                    editedUser?.isAdmin ? 'Admin' : 'Stuff' 
                    }
                  </span>
                </div>
              </div>
            </div>
            {isEditMode && <Button className='saveButton' onClick={saveHandler}>Save</Button>
            }
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single