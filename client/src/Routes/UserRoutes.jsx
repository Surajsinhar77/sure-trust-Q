import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AskQuestion from '../pages/AskQuestion';
import AboutUs from '../pages/AboutUs';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/ask-question" element={<AskQuestion />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  );
}