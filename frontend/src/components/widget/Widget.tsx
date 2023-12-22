import "./widget.scss";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import IceSkatingOutlinedIcon from '@mui/icons-material/IceSkatingOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SpaIcon from '@mui/icons-material/Spa';

interface  WidgetProps {
  type: string;
}

interface WidgetData {
  title: string;
  isMoney: boolean;
  link: string;
  icon: JSX.Element;
}

const Widget = ({ type }: WidgetProps) => {
  let data: WidgetData = {
    title: '',
    isMoney: false,
    link: '',
    icon: <div />, // Replace this with a default JSX element
  };

  // Temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "clothes":
      data = {
        title: "CLOTHES",
        isMoney: false,
        link: '',
        icon: (
          <LoyaltyOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "bags":
      data = {
        title: "BAGS",
        isMoney: false,
        link: '',
        icon: (
          <LocalMallIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "shoes":
      data = {
        title: "SHOES",
        isMoney: false,
        link: '',
        icon: (
          <IceSkatingOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
      case "wallets":
        data = {
          title: "WALLET",
          isMoney: false,
          link: '',
          icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
          ),
        };
        break;
      case "accessories":
        data = {
          title: "ACCESSORIES",
          isMoney: false,
          link: '',
          icon: (
            <InterestsOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(62, 152, 199, 0.2)",
                color: "blue",
              }}
            />
          ),
        };
        break;
      case "scarf":
        data = {
          title: "SCARF",
          isMoney: true,
          link: '',
          icon: (
            <SpaIcon
              className="icon"
              style={{
                backgroundColor: "rgba(116, 81, 248, 0.2)",
                color: "#7451f8",
              }}
            />
          ),
        };
        break;
    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && '£'} { amount }</span>
        <span className="link">{data.link}</span>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUpIcon />
          { diff }%
        </div>
        {data.icon}
      </div>
    </div>
  )
}
export default Widget
