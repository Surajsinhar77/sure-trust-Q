import React from 'react';
import ResponsiveAppbar from '../components/ResponsiveAppBar';
import { Outlet, Route, Routes } from 'react-router-dom'; 

export default function Home() {
  return (
    <div>
      <h1>HOme</h1>
      <Outlet/>
    </div>
  );
}