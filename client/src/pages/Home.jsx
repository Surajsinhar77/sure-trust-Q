import React from 'react';
// import ResponsiveAppbar from '../components/ResponsiveAppBar';
import { Outlet, Route, Routes } from 'react-router-dom'; 
import Questioncard from "../components/Questioncard";
import { Box } from '@mui/material';


export default function Home() {
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