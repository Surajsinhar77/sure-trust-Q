import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Button, Typography, Avatar } from "@mui/material";
import { useAuth } from "../common/AuthProvider";
import { useNavigate } from "react-router-dom";
import ProfilePicUploader from "../components/FileUploaderHandle";

export default function RegisterPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [userDetail, SetUserDetail] = useState('');
    const { login } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onInputChange = (e) => {
        const { name, value } = e.target;
        SetUserDetail({ ...userDetail, [name]: value });
    }

    const handleRegister = async () => {
        // Handle registration logic here
       
    };

    function OnClose() {
        setOpen(false);
    }

    function OnOpen() {
        setOpen(true);
    }

    return (
        <div className=" flex flex-col items-center justify-center h-screen gap-3">
            <h1 className="text-3xl font-bold ">SignUp</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 border flex flex-col items-center gap-5">
                <div className="avaterDiv border-2 rounded-full border-blue-500 p-1">
                    {/* <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" /> */}
                    <ProfilePicUploader
                        isOpen={open}
                        onClose={OnClose}
                        onOpen={OnOpen}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
                </div>
                <div >

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
                        Name
                        <Input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            label="Name"
                            name="Name"
                            onChange={(e) => onInputChange(e)}
                        />
                    </label>

                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                        <Input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            label="Password"
                            name="password"
                            onChange={(e) => onInputChange(e)}
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-2 items-center justify-between">
                    <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        variant="contained"
                        onClick={handleRegister}
                        loading={loading}
                    >
                        Register
                    </Button>
                    <Link
                        className="inline-block align-baseline font-bold text-xm text-center text-blue-500 hover:text-blue-800"
                        to="/login"
                    >
                        <Typography>Already have an account? Login</Typography>
                    </Link>
                </div>
            </div>
        </div>
    );
}