import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from './Store';

interface PrivateRouteProps {
  children ?: React.ReactElement
  allowRedirect: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowRedirect, children }) => {
  const { state } = useContext(Store)
  const { userInfo } = state

  if (!userInfo && allowRedirect) {
    // Redirect to signin page if the user is not authenticated and allowRedirect is true
    return <Navigate to="/signin" />
  }

  // Render the provided element if the user is authenticated or allowRedirect is false
  return children
};

export default PrivateRoute
