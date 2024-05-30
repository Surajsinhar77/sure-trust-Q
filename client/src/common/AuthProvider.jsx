import { useContext, createContext, useState } from "react";

const context = createContext();

export default function AuthProvider({children}) {
    // const [user, setUser] = useState( ()=>{
    //     const user = localStorage.getItem("user");
    //     return user ? JSON.parse(user) : null;
    // })
const [user, setUser] = useState(true)

    function register(user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    function login(user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
    }   

    return (
        <context.Provider
            value={{
                user,
                setUser,
                // login,
                // logout
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useAuth = () => useContext(context);