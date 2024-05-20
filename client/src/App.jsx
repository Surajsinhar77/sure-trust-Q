import './App.css'
import { useState } from 'react';
// All componets Exports from here
import Login from './components/Login';
import Registerpage from './components/Registerpage';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Questioncard from "./components/Questioncard";
import CodeUI from './components/CodeUI';
import { Code } from '@mui/icons-material';


function App() {
  const [count, setCount] = useState(0)
  const [codeSnippet, setCodeSnippet] = useState('');
  return (
    <>
      {/* <h1>Counter App</h1> */}
      {/* <Login/> */}
      {/* <Registerpage/> */}
      {/* <ResponsiveAppBar/> */}

      {/* <Questioncard/> */}
      <CodeUI value={codeSnippet} onChange={setCodeSnippet}/>
    </>
  )
}

export default App
