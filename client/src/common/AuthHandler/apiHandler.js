import { toast } from "react-toastify";
import params from './params.json';
import axios from 'axios';

const notify = (message, { type }) => {
    if (type) {
        toast.success(message);
        return;
    }
    toast.error(message);
}

export async function LoginUser(userDeatil, setLoading, navigate, login) { //userDeatil, setLoading
    try {
        setLoading(true);
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!userDeatil.email || !passwordRegEx.test(userDeatil.password)) {
            if (!userDeatil.email) {
                notify("Please enter the email", false);
            } else if (!passwordRegEx.test(userDeatil.password)) {
                notify("Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters", false);
            } else {
                notify("Please fill all the fields", false);
            }
            setLoading(false);
            return;
        }
        const response = await axios.post(`${params?.productionBaseAuthURL}/login`, { email: userDeatil.email, password: userDeatil.password }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
            }
        });

        if (response.status === 200) {
            console.log("This is the response api handler ", response?.headers);
            if (response?.data?.data) {
                login(response.data.data);
                notify(response.data.message, { type: true });
                setLoading(false);
                navigate('/');
                return;
            }
            throw new Error(response.data.message);
        }
        console.log("This is the response api handler ", response);

        // navigate('/login');
        setLoading(false);
    } catch (err) {
        console.log("This is the main Error Here ", err);
        notify(err.message, { type: false });
        navigate('/login');
        setLoading(false);
    }
}


export async function RegisterUser(userDetail, setLoading, navigate) {
    setLoading(true);
    console.log("RegisterUser", userDetail)
    try {
        if (!userDetail.Name || !userDetail.email || !userDetail.password || !selectedFile) {
            if (!userDetail.Name) {
                notify("Please enter the name", false);
            } else if (!userDetail.email) {
                notify("Please enter the email", false);
            } else if (!userDetail.password) {
                notify("Please enter the password", false);
            } else if (!selectedFile) {
                notify("Please select the profile picture", false);
            } else {
                notify("Please fill all the fields", false);
            }
            setLoading(false);
            return;
        }

        const newform = new FormData();
        newform.append('name', userDetail.name);
        newform.append('email', userDetail.email);
        newform.append('password', userDetail.password);
        newform.append('file', selectedFile);

        const response = await register(newform)
        if (response) {
            login(response);
            navigate('/');
        }
        setLoading(false);
        return;
    } catch (error) {
        toast.error(error.message);
    }
    setLoading(false);
}