import { State, Action } from '../types/Mood'

const DarkModeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LIGHT': 
      return { darkMode: false }
    case 'DARK': 
      return { darkMode: true }
    case 'TOGGLE':
      return { darkMode: !state.darkMode }
    default:
      return state;
  }
}

export default DarkModeReducer