import React from 'react'
import { UserInfo } from './types/User'

type AppState = {
  userInfo?: UserInfo
}

const initialState: AppState = {
  userInfo: localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')!)
    : null
}

type Action = 
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT'; }

const reducer = (state: AppState, action: Action): AppState => {
  switch(action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }  
    case 'USER_SIGNOUT':
      return {
        // all the default setting put
      }  
    default:
      return state  
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

const StoreProvider = (props: React.PropsWithChildren<{}>) => {
  const [ state, dispatch ] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer, initialState
  )
  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }