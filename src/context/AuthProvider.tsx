import { AxiosPromise } from "axios";
import React, { createContext, useState } from "react";

type AuthContextProviderProps = {
    children: React.ReactNode
}

const AuthContext = createContext<any>({})


export const AuthProvider = ({children}:AuthContextProviderProps) => {
    const [auth,setAuth] = useState({})
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;