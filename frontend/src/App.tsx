import Home from './pages/home/Home'
import List from './pages/list/List';
import Signup from "./pages/signup/Signup"
import Signin from './pages/siginin/Signin'
import Single from './pages/single/Single'
import PageNotFound from './pages/pageNotFound/PageNotFound'
import New from './pages/new/New';
import Inventory from './pages/inventory/Inventory'
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Live from './pages/live/Live'
import Stock from './pages/stock/Stock'
import Modal from 'react-modal'
import PrivateRoute from './PrivateRoute'
import { DarkModeContext } from './context/darkModeContext'
import { userInputs } from './formSource'
import { useContext } from 'react'
import './style/dark.scss'

const App = () => {
  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute allowRedirect={true}><Home /></PrivateRoute>} />
          <Route path="live" element={<PrivateRoute allowRedirect={true}><Live /></PrivateRoute>} />
          <Route path="stocks" element={<PrivateRoute allowRedirect={true}><Stock /></PrivateRoute>} />
          <Route path="inventories" element={<PrivateRoute allowRedirect={true}><Inventory /></PrivateRoute>} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="users/:userId" element={<PrivateRoute allowRedirect={true}><Single /></PrivateRoute>} /> 
          <Route path="users/new" element={<PrivateRoute allowRedirect={true}><New inputs={userInputs} title="Add New User" /></PrivateRoute>} />
          <Route path="users" element={<PrivateRoute allowRedirect={true}><List /></PrivateRoute>} />
          <Route path="products/:productId" element={<PrivateRoute allowRedirect={true}><Single /></PrivateRoute>} />
          <Route path="products/new" element={<PrivateRoute allowRedirect={true}><New inputs={userInputs} title="Add New Product" /></PrivateRoute>}/>
          <Route path="products" element={<PrivateRoute allowRedirect={true}><List /></PrivateRoute>} /> 
          <Route path="orders" element={<PrivateRoute allowRedirect={true}><PageNotFound /></PrivateRoute>} /> 
          <Route path="deliveries" element={<PrivateRoute allowRedirect={true}><PageNotFound /></PrivateRoute>} /> 
        </Routes>
      </BrowserRouter>
    </div>
    );
}

export default App;

Modal.setAppElement('#root')