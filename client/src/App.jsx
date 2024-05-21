import './App.css'
import AllRoutes from './common/AllRoutes'
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <AllRoutes />
      <Footer />
    </>
  )
}

export default App
