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
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.user?.accessToken,
            }
        });

        if (response.status === 200) {
            if (response?.data?.data) {
                login(response.data.data);
                notify(response.data.message, { type: true });
                setLoading(false);
                navigate('/');
                return;
            }
            throw new Error(response.data.message);
        }

        // navigate('/login');
        setLoading(false);
    } catch (err) {
        const error = err.response?.data?.message || err.message;
        notify(error, {type : false} );
        setLoading(false);
        navigate('/login');
    }
}


export async function RegisterUser(userDetail, setLoading, navigate, selectedFile) {
    setLoading(true);
    console.log("image is here ",selectedFile);
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

        const response = await axios.post(`${params?.productionBaseAuthURL}/signup`, newform, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user'))?.accessToken,
            }
        });
        console.log("User register response : ", response);
        if (response.status === 200) {
            notify(response.data.message, { type: true });
            navigate('/login');
        }
        setLoading(false);
        return;
    } catch (error) {
        toast.error(error.message);
    }
    setLoading(false);
}


export const UserLogout = async (navigate, logoutContextApi) => {
    try {
        const response = await axios.get(`${params?.productionBaseAuthURL}/logout`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('user'))?.accessToken,
            }
        });
        if (response.status === 200) {
            logoutContextApi();
            toast.success("Logged out successfully", true);
            navigate('/login');
            return;
        }
        throw new Error("Something went wrong");
    }
    catch (error) {
        toast.error(error.message , false);
    }
}

export const refreshAccessToken = async (setLoading, setAccessToken) => {
    try {
        setLoading(true);
        const response = await axios.get(`${params?.productionBaseAuthURL}/refresh`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.accessToken,
            }
        });
        
        if (response.status === 200) {
            setAccessToken(response.data.accessToken);
            setLoading(false);
            return;
        }
        throw new Error("Something went wrong");
    }
    catch (error) {
        setLoading(false);
        toast.error(error.message, false);
    }
}

function isTokenExpired(token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}

axios.interceptors.request.use(
    async (config) => {
        let token = JSON.Promise(localStorage.getItem('user'))?.accessToken;
        if (token && isTokenExpired(token)) {
            try {
                token = await refreshAccessToken();
            } catch (error) {
                // Handle token refresh failure (e.g., redirect to login)
                console.error('Token refresh failed', error);
                throw error;
            }
        }
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

