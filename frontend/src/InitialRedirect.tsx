import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { UserInfo } from './types/User'

interface InitialRedirectProps {
  userInfo?: UserInfo
  allowRedirect?: boolean
}

const InitialRedirect:React.FC<InitialRedirectProps> = ({ userInfo, allowRedirect = true }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/signin';

  useEffect(() => {
    if (!userInfo || allowRedirect) navigate(redirect);
  }, [navigate, userInfo, redirect, allowRedirect]);

  return null; // This component doesn't render anything
};

export default InitialRedirect;
