import React from 'react';
// import ResponsiveAppbar from '../components/ResponsiveAppBar';
import { Outlet } from 'react-router-dom'; 
import Questioncard from "../components/Questioncard";
import {getQuestions } from '../common/AuthHandler/apiHandler';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAuth} from '../common/AuthProvider'

async function fetchQuestions(setQuestions, setLoading) {
  try {
    const response = await getQuestions(setLoading);
    setQuestions(response);
    console.log(" line no 14 Home ", response);
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

export default function Home() {
  const { setLoding } = useAuth();
  const [questions, setQuestions] = React.useState([]);
  
  useEffect(() => {
    fetchQuestions(setQuestions, setLoding );
  }, [])
  return (
    <Box gap={3}>
      <div  className=" flex flex-col gap-6">
        <Questioncard/>
        <Questioncard/>
        <Questioncard/>
      </div>
      <Outlet/>
    </Box>
  );
}