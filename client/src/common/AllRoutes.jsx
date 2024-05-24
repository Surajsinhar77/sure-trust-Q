import { Route, Routes, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Registerpage";
import Home from "../pages/Home";
import AskQuestion from "../pages/Aquestion";
import AboutUs from "../pages/AboutUs";
import MyQuestion from "../pages/MyQuestion";
import Allanswer from "../pages/Allanswer";
import Test from "../pages/Test";
import NotFound from '../pages/NotFound';
import { useAuth } from "../common/AuthProvider";
import UserProfile from "../pages/UserProfile";


export default function AllRoutes() {
  const { user } = useAuth();

  return (
    <Routes>

      {
        user ?
          <>
            <Route path="/*" element={<Home />} />
            <Route path="ask-question" element={<AskQuestion />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="/my-questions" element={<MyQuestion />} />
            <Route path="/all-answer" element={<Allanswer />} />
            <Route path='/test' element={<Test />} />
            <Route path="*" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
          </>
          :
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={< NotFound/>} />
          </>
      }

    </Routes>
  );
}