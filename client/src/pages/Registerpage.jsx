import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Button, Typography, Avatar } from "@mui/material";
import { useAuth } from "../common/AuthProvider";
import { useNavigate } from "react-router-dom";
import FileUploaderCard from "../components/FileUploaderCard";
import Model from "../components/Model";
import { RegisterUser } from "../common/AuthHandler/apiHandler";
import LoadingButton from "../components/Loadingbutton";


const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    Height: '90vh',
    bgcolor: '#f1f2f3',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function RegisterPage() {
    let [images, setSelectedFile] = useState([]);
    const [userDetail, SetUserDetail] = useState('');
    // const { login } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onInputChange = (e) => {
        const { name, value } = e.target;
        SetUserDetail({ ...userDetail, [name]: value });
    }

    function OnClose() {
        setOpen(false);
    }

    function OnOpen() {
        setOpen(true);
    }

    const handleRegister = async () => {
        // Handle registration logic here
        RegisterUser(userDetail, setLoading, navigate, images[0]);
    };

    return (
        <div className=" flex flex-col items-center justify-center h-screen gap-3">
            <h1 className="text-3xl font-bold ">SignUp</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 border flex flex-col items-center gap-5">
                <div className="flex flex-col items-center gap-2">
                    <div className="avaterDiv border-2 rounded-full border-blue-500 p-1">
                        {/* <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" /> */}
                        <Model
                            name="Upload Image"
                            src={images?.length > 0 ? images?.length && URL?.createObjectURL(images[0]) : "https://docs.material-tailwind.com/img/face-2.jpg"}
                            style={style}
                        >
                            <FileUploaderCard
                                // isOpen={open}
                                // onClose={OnClose}
                                // onOpen={OnOpen}
                                images={images}
                                selectedFile={setSelectedFile}
                            />
                        </Model>
                    </div>
                    <Typography> Upload Profile Picture </Typography>
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
                    {/* <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        variant="contained"
                        onClick={handleRegister}
                        isLoading={loading}
                    >
                        Register
                    </Button> */}

                    <LoadingButton
                        // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        isLoading={loading}
                        onClick={handleRegister}
                        variant="contained"
                        color="primary"
                    >
                        Register
                    </LoadingButton>
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