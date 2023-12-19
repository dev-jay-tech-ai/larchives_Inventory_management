import { useContext } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store"
import InsertChartIcon from "@mui/icons-material/InsertChart"
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined"
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import LiveTvIcon from '@mui/icons-material/LiveTv'
import InventoryIcon from '@mui/icons-material/Inventory'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import { Link } from "react-router-dom"
import logo from '../../assets/logo.svg' // Adjust the path based on the location of your Sidebar component
import { Store } from '../../Store'
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const {
    state: { userInfo },
    dispatch: userDispatch,
  } = useContext(Store)

  const signoutHandler = () => {
    userDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    window.location.href = '/signin'
  }
  const { dispatch: darkModeDispatch } = useContext(DarkModeContext)

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none", textAlign: 'center' }}>
          <img src={logo} alt="Logo" className="logo" style={{ width: '80%', verticalAlign: 'middle' }} />
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/live" style={{ textDecoration: "none" }}>
            <li>
              <LiveTvIcon className="icon" />
              <span>Stock live</span>
            </li>
          </Link>
          <Link to="/stocks" style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Stock</span>
            </li>
          </Link>
          <Link to="/inventories" style={{ textDecoration: "none" }}>
            <li>
              <AccountTreeIcon className="icon" />
              <span>Inventory</span>
            </li>
          </Link>
          {userInfo?.isAdmin &&
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>}
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </Link>  
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={signoutHandler}>Signout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => darkModeDispatch({ type: 'LIGHT' })}
        ></div>
        <div
          className="colorOption"
          onClick={() => darkModeDispatch({ type: 'DARK' })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;