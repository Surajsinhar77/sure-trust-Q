import { useContext, createContext, useState } from "react";

const context = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null)

    return (
        <context.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useAuth = () => useContext(context);