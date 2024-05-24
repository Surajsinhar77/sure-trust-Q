import './App.css'
import AllRoutes from './common/AllRoutes'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';
import { useAuth } from './common/AuthProvider';

function App() {
  const { user } = useAuth()

  return (
    <>
      {user? <ResponsiveAppBar/> : ""}
      <AllRoutes />
      {user?  <Footer /> : ""}
    </>
  )
}

export default App
