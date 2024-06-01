import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './common/AllRoutes'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';
import { useAuth } from './common/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import Loader from './components/Loader';

function App() {
  const { user, loading } = useAuth();
  return (
    <>
      {
        loading ? <Loader /> :
          <>
            {user ? <ResponsiveAppBar /> : ""}
            <AllRoutes />
            {user ? <Footer /> : ""}
            <ToastContainer />
          </>
      }
    </>
  )
}

export default App
