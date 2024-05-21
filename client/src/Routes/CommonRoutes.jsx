import React from "react";
import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Registerpage";

export default function CommonRoutes() {
  return (
    <>
      <Route path="/login" element={Login} />
      <Route path="/register" element={Register} />
    </>
  );
}