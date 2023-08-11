import { ReactNode, createContext, useReducer } from 'react'
import DarkModeReducer from './darkModeReducer'
import { State } from '../types/Mood'

const INITIAL_STATE:State = {
  darkMode: false
}

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeContext = createContext(INITIAL_STATE)
