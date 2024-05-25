import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './common/AllRoutes'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';
import { useAuth } from './common/AuthProvider';
import { toast , ToastContainer } from 'react-toastify';

function App() {
  const { user } = useAuth()
  return (
    <>
      {user? <ResponsiveAppBar/> : ""}
      <AllRoutes />
      {user?  <Footer /> : ""}
      <ToastContainer />
    </>
  )
}

export default App
