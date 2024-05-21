import { Route, Routes, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Registerpage";
import Home from "../pages/Home";
import AskQuestion from "../pages/Aquestion";
import AboutUs from "../pages/AboutUs";
import MyQuestion from "../pages/MyQuestion";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="ask-question" element={<AskQuestion />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-questions" element={<MyQuestion />} />
    </Routes>
  );
}