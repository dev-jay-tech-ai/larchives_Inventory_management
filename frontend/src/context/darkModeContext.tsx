import { Dispatch, ReactElement, createContext, useReducer } from 'react';
import DarkModeReducer from './darkModeReducer';
import { Action } from '../types/Mood';

const INITIAL_STATE = {
  darkMode: false,
  dispatch: () => {},
}

interface DarkModeProviderProps {
  children: ReactElement
}

type DarkModeContextType = {
  darkMode: boolean;
  dispatch: Dispatch<Action>; // Specify the Dispatch type with the Action type
}

export const DarkModeContext = createContext<DarkModeContextType>(INITIAL_STATE);
export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [ state, dispatch ] = useReducer(DarkModeReducer, INITIAL_STATE)
  
  return (
    <DarkModeContext.Provider 
      value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  )
}