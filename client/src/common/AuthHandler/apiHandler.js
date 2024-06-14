import { toast } from "react-toastify";
import params from './params.json';
import axios from 'axios';


// function to notify user
const notify = (message, { type }) => {
    if (type) {
        toast.success(message);
        return;
    }
    toast.error(message);
}


// function to check if token is expired
function isTokenExpired(token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}


export const checkingTokenExpiry = async () => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        if (isTokenExpired(token)) {
            const response = await axios.get(`${params?.productionBaseAuthURL}/refreshAccessToken`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
                }
            });

            if (response.status === 200) {
                localStorage.setItem('accessToken', JSON.stringify(response?.data?.data?.accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(response?.data?.data?.refreshToken));
                console.log("Token refreshed successfully");
                return response?.data?.data?.accessToken;
            } else {
                // navigate('/login');
                toast.error(response.data.message, false);
                throw new Error(response.data.message);
            }
        }
        return token;
    } catch (error) {
        toast.error("Token expired, please login again", false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        toast.error("Token expired, please login again", false);
        console.log("Error in checkingTokenExpiry : ", error.message);
        window.location.href = '/login';
        return null;
    }
}

export async function LoginUser(userDetail, setLoading, navigate, login, setAccessToken, setRefreshToken) { //userDetail, setLoading
    try {
        setLoading(true);
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!userDetail.email || !passwordRegEx.test(userDetail.password)) {
            if (!userDetail.email) {
                notify("Please enter the email", false);
            } else if (!passwordRegEx.test(userDetail.password)) {
                notify("Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters", false);
            } else {
                notify("Please fill all the fields", false);
            }
            setLoading(false);
            return;
        }
        const response = await axios.post(`${params?.productionBaseAuthURL}/login`, { email: userDetail.email, password: userDetail.password }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
            }
        });

        if (response.status === 200) {
            if (response?.data?.data) {
                login(response.data.data);
                setAccessToken(response?.data?.data?.accessToken);
                setRefreshToken(response.data?.data?.refreshToken);
                notify(response.data.message, { type: true });
                setLoading(false);
                navigate('/');
                return;
            }
            throw new Error(response.data.message);
        }
        setLoading(false);
    } catch (err) {
        const error = err.response?.data?.message || err.message;
        notify(error, { type: false });
        setLoading(false);
        navigate('/login');
    }
}


export async function RegisterUser(userDetail, setLoading, navigate, selectedFile) {
    setLoading(true);
    console.log("image is here  this ", selectedFile);
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
        newform.append('name', userDetail.Name);
        newform.append('email', userDetail.email);
        newform.append('password', userDetail.password);
        newform.append('file', selectedFile);
        newform.append('role', 'student');
        newform.append('courseId' , '665e66419412445cf19d4522'); // just for now 
        newform.append('batchId' , '665e78c8550b4629740391f7'); // just for now


        const response = await axios.post(`${params?.productionBaseAuthURL}/signup`, newform, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('accessToken')),
            }
        });
        if (response.status === 200) {
            notify(response.data.message, { type: true });
            navigate('/login');
            setLoading(false);
            return;
        }
        throw new Error(response.data.message);
    } catch (error) {
        toast.error(error.response?.data?.message, false);
        setLoading(false)
    }
}

export const UserLogout = async (navigate, logoutContextApi) => {
    try {
        let newToken = await checkingTokenExpiry();
        if (newToken === null) {
            newToken = JSON.parse(localStorage.getItem('accessToken'));
        }
        console.log("newToken : ", newToken)
        const response = await axios.get(`${params?.productionBaseAuthURL}/logout`, {
            // const response = await axios.get(`http://localhost:8000/api/v1/auth/logout`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + newToken,
            },
            // pass cookies as well
            withCredentials: true,
        });

        if (response.status === 200) {
            logoutContextApi();
            toast.success("Logged out successfully", true);
            navigate('/login');
            return;
        }
        throw new Error(response.data.message);
    }
    catch (error) {
        toast.error("Try login again ", false);
        toast.error(error?.response?.data?.message || error.message, false);
        logoutContextApi();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.reload();
    }
}

export async function addNewQuestion(newQuestion, setLoading, navigate) {
    try {
        let token = await checkingTokenExpiry();

        console.log("newQuestion : ", newQuestion);
        const response = await axios.post(`${params?.questionURL}/addQuestion`,
            newQuestion,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                withCredentials: true,
            });
        if (response.status === 200) {
            console.log("Question added successfully ", response.data?.data);
            toast.success(response.data.message, true);
            setLoading(false);
            return response.data?.data;
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.log("Error in addNewQuestion : ", error.message);
        toast.error(error?.response?.data?.message || error.message,  false);
        setLoading(false);
    }
}


export async function getQuestions() {
    try {
        let token = await checkingTokenExpiry();
        const response = await axios.get(`${params?.questionURL}/getQuestion`, {
            // const response = await axios.get(`${params?.baseURL}/api/v1/question/getQuestion`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            withCredentials: true,
        });
        if (response.status === 200) {
            return response.data?.data;
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.log("Error in getQuestions : ", error.message);
        toast.error(error?.response?.data?.message || error.message, false);
    }
}


export async function deleteUserById(id){
    try {
        let token = await checkingTokenExpiry();
        const response = await axios.delete(`${params?.productionBaseAuthURL}/deleteUserById/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            withCredentials: true,
        });
        if (response.status === 200) {
            console.log("User deleted successfully ", response.data?.message);
            return response.data;
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.log("Error in deleteUserById : ", error.message);
        toast.error(error?.response?.data?.message || error.message, false);
    }
}


export async function submitAnswer(answerForm, id ){
    try{
        console.log("answerForm : ", answerForm, id);

        let token = await checkingTokenExpiry();
        const response = await axios.post(`${params?.answerURL}/addAnswer/${id}`, answerForm, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            },
            withCredentials: true,
        });
        console.log("this is response from the submitAnswer", response)
        if(response.status === 200){
            toast.success(response.data.message, true);
            return response.data;
        }
        throw new Error(response.data.message);
    }catch(err){
        toast.error( err.message || err?.response?.data?.message, false);
    }
}