import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, Button, Input, Typography } from "@mui/material";
import { useAuth } from "../common/AuthProvider";
import { LoginUser } from "../common/AuthHandler/apiHandler";
import Loadingbutton from '../components/Loadingbutton';

export default function LoginPage() {
  const navigate = useNavigate();
  const [userDeatil, setUserDetail] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({ ...userDeatil, [name]: value });
  }

  const handleLogin = async () => {
    const result = LoginUser(userDeatil, setLoading, navigate, login);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-3xl font-bold ">Login</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 border flex flex-col items-center gap-5">
        <div className="avaterDiv border-2 rounded-full border-blue-500 p-1">
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              label="Email"
              name="email"
              onChange={(e) => onInputChange(e)}
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              color="primary"
              id="password"
              type="password"
              label="Password"
              name="password"
              onChange={(e) => onInputChange(e)}
            />
          </label>

        </div>
        <div className="flex flex-col items-center justify-between gap-2">
          <Loadingbutton
            // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            isLoading={loading}
            onClick={handleLogin}
            variant="contained"
            color="primary"
          >
            Sign In
          </Loadingbutton>
          <Link
            className="inline-block align-baseline font-bold text-xs text-center text-gray-500 hover:text-blue-800"
            to="/register"
          >
            <Typography >Don't have an account? Register</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}


